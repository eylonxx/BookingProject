class VacationModel {
  public id: number;
  public description: string;
  public destination: string;
  public imageName: string;
  public image: any;
  public startingDate: string;
  public endingDate: string;
  public price: number;
  public followers: number;
  public isFollowed: boolean;

  public constructor(vacation: VacationModel) {
    this.id = vacation.id;
    this.description = vacation.description;
    this.destination = vacation.destination;
    this.imageName = vacation.imageName;
    this.startingDate = vacation.startingDate;
    this.endingDate = vacation.endingDate;
    this.price = vacation.price;
    this.followers = vacation.followers;
    this.isFollowed = false;
    // starts as false
  }
}

export default VacationModel;
