/**
 * 处理广播给其他客户端事件，客户端接收服务端要求数据结构：
 *  data: {type message id}
 *  1. message === '用户退出' 用户退出时，关闭协同编辑时其提示框
 *  2. type == 1 send 成功或失败
 *  3. type == 2 更新数据
 *  4. type == 3 多人操作不同选区("t": "mv")（用不同颜色显示其他人所操作的选区）
 *  5. type == 4 批量指令更新
 *  6. type == 5 showloading
 *  7. type == 6 hideloading
 */

import WebSocket from "ws";
import { CustomWebSocket } from "../Interface";

/**
 * 广播给其他客户端
 * @param wss
 * @param currentClient
 * @param data
 */
export function broadcastOtherClients(
  wss: WebSocket.Server,
  currentClient: CustomWebSocket,
  data: string
) {
  wss.clients.forEach((conn) => {
    /**
     * 请注意，此处应该做校验：
     *  1. 协同类型是否为 luckysheet
     *  2. 当前用户的文件ID 是否一致（同一篇文档的用户才协同）
     *  3. 当前用户的 wid 是否一致（同一用户不发送消息）
     */
    const { type, fileid, userid } = (<CustomWebSocket>conn).clientInfo;
    if (type !== "luckysheet") return;
    if (fileid !== currentClient.clientInfo.fileid) return;
    if (userid === currentClient.clientInfo.userid) return;

    // 校验通过，发送消息给客户端
    if (conn.readyState === WebSocket.OPEN) conn.send(data);
  });
}
