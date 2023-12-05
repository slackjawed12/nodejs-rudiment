const { scheduleJob } = require("node-schedule");
const { Op } = require("sequelize");
const { Good, Auction, User, sequelize } = require("./models");
/**
 * 서버가 재시작할 때 낙찰자 선정해야 하는 경매물품 찾아서 낙찰자 지정하는 루틴
 */
module.exports = async () => {
  console.log("checkAuction");
  try {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    // 24시간이 지난 낙찰자가 없는 경매물품들
    const targets = await Good.findAll({
      where: {
        SoldId: null,
        createdAt: { [Op.lte]: yesterday },
      },
      transaction: t,
    });
    targets.forEach(async (good) => {
      await processSold(good);
    });

    // 24시간이 지나지 않고 낙찰자가 없는 경매물품들
    const ongoing = await Good.findAll({
      where: {
        SoldId: null,
        createdAt: {
          [Op.gte]: yesterday,
        },
      },
    });
    ongoing.forEach((good) => {
      const end = new Date(good.createdAt);
      end.setDate(end.getDate() + 1);
      const job = scheduleJob(end, async () => {
        await processSold(good);
      });
      job.on("error", (err) => {
        console.error("스케줄링 에러", err);
      });
      job.on("success", () => {
        console.log("스케줄링 성공");
      });
    });
  } catch (err) {
    console.error(err);
  }
};

const processSold = async (good) => {
  const t = sequelize.transaction();
  try {
    const success = await Auction.findOne({
      where: {
        GoodId: good.id,
        order: [["bid", "DESC"]],
      },
      transaction: t,
    });
    await good.setSold(success.UserId, { transaction: t });
    await User.update(
      {
        money: sequelize.literal(`money - ${success.bid}`),
      },
      {
        where: { id: success.UserId },
        transaction: t,
      }
    );
    await t.commit();
  } catch (err) {
    await t.rollback();
  }
};
