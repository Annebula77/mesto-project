export default class UserInfo {
    constructor(name, about, avatar) {
        this._name = name;
        this._about = about;
        this._avatar = avatar;
    };

    getUserInfo() {
        this.name = this._name.textContent;
        this.about = this._about.textContent;
        this.avatar = this._avatar.src;
      return this;
    };

    setUserInfo(data) {
        if(data.name) {
            this._name.textContent = data.name;
        }
        if(data.about) {
            this._about.textContent = data.about;
        }
        if(data.avatar) {
            this._avatar.src = data.avatar;
        }
        if(data._id){
            this.userId = data._id;
        }
    };

};
