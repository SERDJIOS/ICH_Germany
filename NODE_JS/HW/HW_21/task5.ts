abstract class Media {
    abstract play(): void;
}

class Audio extends Media {
    play(): void {
        console.log("Playing audio");
    }
}

class Video extends Media {
    play(): void {
        console.log("Playing video");
    }
}

const mediaItems: Media[] = [new Audio(), new Video()];

mediaItems.forEach(item => {
    item.play();
}); 