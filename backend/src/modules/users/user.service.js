import { Op } from 'sequelize';
export class UserService {
  constructor(userModel) {
    this.userModel = userModel;
  }

  async createUser(nickname, socketId) {
    return await this.userModel.create({ nickname, socketId });
  }

  async findUserBySocketId(socketId) {
    return await this.userModel.findOne({ where: { socketId } });
  }

  async deleteUserBySocketId(socketId) {
    return await this.userModel.destroy({ where: { socketId } });
  }

  async updateLastSeenAt(socketId) {
    return await this.userModel.update({ lastSeenAt: new Date() }, { where: { socketId } });
  }

  async getOnlineUsersCount() {
    return await this.userModel.count({
      where: { socketId: { [Op.ne]: null } },
    });
  }
}
