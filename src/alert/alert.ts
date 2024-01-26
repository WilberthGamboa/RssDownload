import figlet from "figlet";
import colors from 'colors';
export default class Alert {
    constructor(){}

    welcomeMessage(){
        figlet("RSS DOWNLOADER", function (err, data) {
            if (err) {
              console.log("Something went wrong...");
              console.dir(err);
              return;
            }
            console.log(data);
          });
    
    }

    rssTitleMessageStart(title:string){
      console.log(colors.red(title))
    }

    rssTitleMessageEnd(title:string){
      console.log(colors.green(title))

    }    
}