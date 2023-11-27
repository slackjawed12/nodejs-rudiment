const Room = require("../schemas/room");
const Chat = require("../schemas/chat");
const { removeRoom: removeRoomService } = require("../services");

exports.renderMain = async (req, res, next) => {
  try {
    const rooms = await Room.find({});
    res.render("main", { rooms, title: "GIF 채팅방" });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

exports.renderRoom = (req, res) => {
  res.render("room", { title: "GIF 채팅방 생성" });
};

exports.createRoom = async (req, res, next) => {
  try {
    const newRoom = await Room.create({
      title: req.body.title,
      max: req.body.max,
      owner: req.session.color,
      password: req.body.password,
    });
    const io = req.app.get("io");
    // /room 네임스페이스에 연결한 모든 클라이언트에 데이터를 보낸다.
    io.of("/room").emit("newRoom", newRoom);
    if (req.body.password) {
      res.redirect(`/room/${newRoom._id}?password=${req.body.password}`);
    } else {
      res.redirect(`/room/${newRoom._id}`);
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
};

// 채팅방에 접속해서 채팅방 화면을 렌더링
exports.enterRoom = async (req, res, next) => {
  try {
    const room = await Room.findOne({ _id: req.params.id });
    if (!room) {
      return res.redirect("/?error=존재하지 않는 방입니다.");
    }
    if (room.password && room.password !== req.query.password) {
      return res.redirect("/?error=비밀번호가 틀렸습니다.");
    }
    const io = req.app.get("io");
    // adapter.rooms = chat 네임스페이스의 room들 - 각각이 채팅방임
    const { rooms } = io.of("/chat").adapter;
    // rooms.get(id) : 해당 방 아이디(id)의 소켓 목록 - size가 소켓 수이므로 참가 인원이 됨
    if (room.max <= rooms.get(req.params.id)?.size) {
      return res.redirect("/?error=허용 인원을 초과했습니다.");
    }
    return res.render("chat", {
      room,
      title: room.title,
      chats: [],
      user: req.session.color,
    });
  } catch (error) {
    console.error(error);
    return next(error);
  }
};

// 채팅방을 삭제
exports.removeRoom = async (req, res, next) => {
  try {
    // 채팅방과 채팅 내역 삭제
    await removeRoomService(req.params.id);
    res.send("ok");
  } catch (error) {
    console.error(error);
    next(error);
  }
};
