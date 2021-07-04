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

        this.BindScroll();
    }

    public BindScroll = () =>{ 
        document.addEventListener('scroll', (e)=>{
            // window.scrollTo(0,0);
        });

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

        const elem = this.allSectionsId[this.currentIndex];
        
        const getHeight = window.innerHeight * (this.currentIndex/this.allSectionsId.length -1);
        console.log(getHeight);
        window.scrollTo(0, getHeight);

        // const test = document.getElementById(elem.id);
        console.log(`Scrolling To ${elem.id} - ${elem.scrollHeight}`);

        // if(test){
        //     // test.scrollIntoView();
        // }
        // window.scrollTo(elem);
        // elem.scrollIntoView();
    }

}