export class EventHandler{
    private allSectionsId : HTMLElement[] = [];
    private currentIndex :number = 0;
    private delay :number = 1;

    private cacheTime : number = 0;

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
        const currentTime = new Date().getTime(); 
        if(this.cacheTime + (this.delay * 1000) > currentTime) return;
        
        this.currentIndex = Math.min(this.allSectionsId.length - 1, this.currentIndex + 1);
        this.Focus();
    }

    private ScrollUp = () => {
        const currentTime = new Date().getTime();
        if(this.cacheTime + (this.delay * 1000) > currentTime) return;

        this.currentIndex = Math.max(0, this.currentIndex - 1);
        this.Focus();
    }

    private Focus = () => {
        this.cacheTime = new Date().getTime();

        const height = window.innerHeight * (this.allSectionsId.length - 1);
        
        const elem = this.allSectionsId[this.currentIndex];
        const getHeight = height * (this.currentIndex / (this.allSectionsId.length -1));

        window.scrollTo(0, getHeight);
    }

}