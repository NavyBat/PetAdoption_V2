class Events {
    constructor( title, description, location, date, time, instruction) {
        const timestamp = new Date().getTime();
        const random = Math.floor(Math.random() * 1000);
        this.id = timestamp + "" + random.toString().padStart(3, '0');
        
        this.title = title;
        this.description = description;
        this.location = location;
        this.date = date;
        this.time = time;
        this.instruction = instruction;
    }
}
module.exports = { Events };
