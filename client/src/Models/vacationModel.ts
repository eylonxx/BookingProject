class VacationModel {
  public id: number;
  public description: string;
  public destination: string;
  public imageName: string;
  public startingDate: string;
  public endingDate: string;
  public price: number;
  public followers: number;

  public constructor(vacation: VacationModel) {
    this.id = vacation.id;
    this.description = vacation.description;
    this.destination = vacation.destination;
    this.imageName = vacation.imageName;
    this.startingDate = vacation.startingDate;
    this.endingDate = vacation.endingDate;
    this.price = vacation.price;
    this.followers = vacation.followers;
  }
}

export default VacationModel;
