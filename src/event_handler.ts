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
        document.addEventListener('wheel', (e) => { 
            // window.scrollTo(0,0);
            // e.preventDefault();
            if(e.deltaY > 0) {
              this.ScrollDown();
            } else {
              this.ScrollUp();
            }
        });
        
    }

    private ScrollDown = () => {
        this.scrollHeight = document.documentElement.scrollTop;

    }

    private ScrollUp = () => {
        this.scrollHeight = document.documentElement.scrollTop;
    }

    public GetScrollHeight = () => {
        return this.scrollHeight;
    }

}