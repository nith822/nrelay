import { NrPlugin, HookPacket, Packet, PacketType, Client, Log, SeverityLevel } from './../core/plugin-module';

import { TextPacket } from './../networking/packets/incoming/text-packet';
import { PlayerTextPacket } from './../networking/packets/outgoing/playertext-packet';

@NrPlugin({
    name: 'Hello Plugin',
    author: 'tcrane'
})
export default class EventNotifierPlugin {
      
    constructor() {
      
    }
  

    @HookPacket(PacketType.Text)
    onText(client: Client, textPacket: TextPacket): void {
      var text = textPacket.text;
      if(text.includes("Lich")) {
        var numLiches = parseInt((text.replace(/[^0-9\.]/g, '')), 10);
        if(numLiches <= 4) {
          Log('Event Notifier: ', client.playerData.server + " :: " + textPacket.text, SeverityLevel.Error);
          return;
        }
      }
      if(text.includes("Avatar") || text.includes("Shatters") 
        ||text.includes("Sphinx") 
        ||text.includes("Hermit")) {
         Log('Event Notifier: ', client.playerData.server + " :: "  + textPacket.text, SeverityLevel.Success);
         return;
      }
      if(text.includes("Cube") 
        ||text.includes("Ghost") 
        ||text.includes("Lord") 
        ||text.includes("Pentaract")
        ||text.includes("Skull")) {
         Log('Event Notifier: ', client.playerData.server + " :: "  + textPacket.text, SeverityLevel.Message);
         return;
      }
    }
}
