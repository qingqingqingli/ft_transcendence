import axios from "axios";
import { Channel} from "../models/Channel.model";
import { ChannelUser} from "../models/ChannelUser.model";

export interface ChannelCreate {
  name: string;
  admin: number;
  users: ChannelUser[];
}

export type ChannelUpdate = ChannelCreate;

export default class ChannelAPI {
  static index() {
    return axios.get("http://localhost:8000/api/channels");
  }

  static show(id: number): Promise<Channel> {
    return axios.get(`http://localhost:8000/api/channels`, {
      params: {
        channelID: id,
      }

    });
  }

  static create(body: ChannelCreate): Promise<Channel> {
    return axios.post("channels", body);
  }

  static update(channel: Channel, body: ChannelUpdate): Promise<Channel> {
    return axios.post(`channels/${channel.ID}`, body);
  }

  static destroy(channel: Channel): Promise<void> {
    return axios.delete(`channels/${channel.ID}`);
  }

  static findName(channelID: number) {
    return axios.get("channels/findName", {
      params: {
        channelID: channelID,
      },
    });
  }

  static leaveChannel(userID: number, channelID : number) {
      return axios.post("channels/remove", {
        userId: userID,
        channelId: channelID
      })
  }
}
