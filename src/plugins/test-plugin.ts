
import { NrPlugin, HookPacket, Packet, PacketType, Client } from './../core/plugin-module';
import { TextPacket } from './../networking/packets/incoming/text-packet';
import { PlayerTextPacket } from './../networking/packets/outgoing/playertext-packet';
import { MapInfoPacket } from './../networking/packets/incoming/mapinfo-packet';
import { UpdatePacket } from './../networking/packets/incoming/update-packet';
import { WorldPosData } from './../networking/data/world-pos-data';
import { NewTickPacket } from './../networking/packets/incoming/newtick-packet';

const path = [
    { x: 132, y: 141 }, 
];

@NrPlugin({
    name: 'Hello Plugin',
    author: 'tcrane'
})
export default class Testplugin {

  
   private players: {
        [id: number]: any[]
    };

    constructor() {
        this.players = {};
    }

    @HookPacket(PacketType.MapInfo)
    onNewTick(client: Client, newTickPacket: NewTickPacket): void {
      
       if (!this.players[client.playerData.objectId]) {
            this.players[client.playerData.objectId] = path.slice();
        }
        if (!client.nextPos) {
            const wp = new WorldPosData();
            const point = this.players[client.playerData.objectId].pop();
            this.players[client.playerData.objectId].unshift(point);
            wp.x = point.x;
            wp.y = point.y;
            client.nextPos = wp;
        }
    }
    
  @HookPacket(PacketType.NewTick)
  onNewTickScan(client: Client, newTickPacket: NewTickPacket): void {
    
    //finds pets LOL
     for(var i = 0; i < newTickPacket.statuses.length; i++) {
       var objectStatusData = newTickPacket.statuses[i];
       if(objectStatusData.stats != null) {
          for(var j = 0; j < objectStatusData.stats.length; j++) {
           if(objectStatusData.stats[j] != null) {
             if(objectStatusData.stats[j].stringStatValue != null) {
              console.log(objectStatusData.pos.x.toPrecision(3) + ","+ objectStatusData.pos.y.toPrecision(3) + " :: " + objectStatusData.objectId);
              console.log(objectStatusData.stats[j].stringStatValue);
              }
             }
          }
        }
      }
     
  }
}
