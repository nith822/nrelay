import { Packet, PacketType } from '../../packet';

export class TextPacket extends Packet {

    public type = PacketType.Text;

    //#region packet-specific members
    name: string;
    objectId: number;
    numStars: number;
    bubbleTime: number;
    recipent: string;
    text: string;
    cleanText: string;
    //#endregion

    public read(): void {
        this.name = this.readString();
        this.objectId = this.readInt32();
        this.numStars = this.readInt32();
        this.bubbleTime = this.readUnsignedByte();
        this.recipent = this.readString();
        this.text = this.readString();
        this.cleanText = this.readString();
    }

    public write(): void {
        this.writeString(this.name);
        this.writeInt32(this.objectId);
        this.writeInt32(this.numStars);
        this.writeUnsigedByte(this.bubbleTime);
        this.writeString(this.recipent);
        this.writeString(this.text);
        this.writeString(this.cleanText);
    }
}
