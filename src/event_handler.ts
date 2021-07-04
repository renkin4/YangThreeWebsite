export class EventHandler{
    private allSectionsId : HTMLElement[] = [];
    private scrollHeight : number = 0;

    /**
     *
     */
    constructor() {
        const allSection = document.querySelectorAll("section");

        allSection.forEach((sec)=>{
            this.allSectionsId.push(sec);
        });
    }

    public BindScroll = () =>{ 
        addEventListener("scroll", () => {
            this.scrollHeight = document.documentElement.scrollTop;
        });
    }

    public GetScrollHeight = () => {
        return this.scrollHeight;
    }

}