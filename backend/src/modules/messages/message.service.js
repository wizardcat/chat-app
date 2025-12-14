export class MessageService {
  constructor(messageModel) {
    this.messageModel = messageModel;
  }

  async createMessage(nickname, message) {
    return await this.messageModel.create({ nickname, message });
  }

  async getMessagesByUserId(userId) {
    return await this.messageModel.findAll({ where: { userId } });
  }

  async getLastMessages() {
    return await this.messageModel.findAll({
      order: [['timestamp', 'DESC']],
      limit: 10,
    });
  }
}