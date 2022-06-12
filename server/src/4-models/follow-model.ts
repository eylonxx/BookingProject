class FollowModel {
  public vacationId: number;
  public userId: number;

  public constructor(followInfo: FollowModel) {
    this.vacationId = followInfo.vacationId;
    this.userId = followInfo.userId;
  }
}
export default FollowModel;
