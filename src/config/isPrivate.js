function isPrivate(body) {
  var chat = body.message.chat;
  if (chat.type === "private") {
    return true;
  }
  return false;
}