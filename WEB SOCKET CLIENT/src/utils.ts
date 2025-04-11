export function getRoomId() {
  const hash = "qwertyuioplkjhgfdaszxcvbnmMNBVCXZDSFAGHJKLPOIUYTREWQ";
  let roomId = "";
  for (let i = 0; i < 7; i++) {
    roomId += hash[Math.floor(Math.random() * hash.length)];
  }
  return roomId;
}
