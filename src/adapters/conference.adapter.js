/**
 * Copyright 2018 SlidesUp. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import firebase from 'firebase/app';
import 'firebase/database';
import { Conf } from '../models/conf';
import { ConfEvent } from '../models/conf-event';
import { Room } from '../models/room';
import { Section } from '../models/section';
import { Speaker } from '../models/speaker';
import { Track } from '../models/track';

const getConfPath = confId => `confs/list/${confId}`;
const getSectionsPath = confId => `confs/detail/${confId}/sections`;
const getTracksPath = confId => `confs/detail/${confId}/tracks`;
const getEventsPath = confId => `confs/detail/${confId}/events`;
const getRoomsPath = confId => `confs/detail/${confId}/rooms`;
const getSpeakersPath = confId => `confs/detail/${confId}/speakers`;

export function getConference(confId) {
    const promises = [];
    promises.push(
        firebase
            .database()
            .ref(getConfPath(confId))
            .once('value')
    );
    promises.push(
        firebase
            .database()
            .ref(getSectionsPath(confId))
            .once('value')
    );
    promises.push(
        firebase
            .database()
            .ref(getTracksPath(confId))
            .once('value')
    );
    promises.push(
        firebase
            .database()
            .ref(getEventsPath(confId))
            .once('value')
    );
    promises.push(
        firebase
            .database()
            .ref(getRoomsPath(confId))
            .once('value')
    );
    promises.push(
        firebase
            .database()
            .ref(getSpeakersPath(confId))
            .once('value')
    );

    return Promise.all(promises).then(snapshots => {
        const jsConf = snapshots[0].val();
        const jsSectionMap = snapshots[1].val();
        const jsTrackMap = snapshots[2].val();
        const jsEventMap = snapshots[3].val();
        const jsRoomMap = snapshots[4].val();
        const jsSpeakerMap = snapshots[5].val();

        const conf = Conf.toModel(confId, jsConf);

        const sectionMap = new Map();
        for (let key in jsSectionMap) {
            if (jsSectionMap.hasOwnProperty(key)) {
                sectionMap.set(key, Section.toModel(key, jsSectionMap[key]));
            }
        }

        const trackMap = new Map();
        for (let key in jsTrackMap) {
            if (jsTrackMap.hasOwnProperty(key)) {
                trackMap.set(key, Track.toModel(key, jsTrackMap[key]));
            }
        }

        const roomMap = new Map();
        for (let key in jsRoomMap) {
            if (jsRoomMap.hasOwnProperty(key)) {
                roomMap.set(key, Room.toModel(key, jsRoomMap[key]));
            }
        }

        const speakerMap = new Map();
        for (let key in jsSpeakerMap) {
            if (jsSpeakerMap.hasOwnProperty(key)) {
                speakerMap.set(key, Speaker.toModel(key, jsSpeakerMap[key]));
            }
        }

        const eventMap = new Map();
        for (let key in jsEventMap) {
            if (jsEventMap.hasOwnProperty(key)) {
                const jsEvent = jsEventMap[key];
                const { trackId, roomIds, speakerIds } = jsEvent;

                const track = trackId ? trackMap.get(trackId) : null;

                const eventRoomMap = new Map();
                if (roomIds) {
                    for (let key in roomIds) {
                        if (roomIds.hasOwnProperty(key)) {
                            eventRoomMap.set(key, roomMap.get(key));
                        }
                    }
                }

                const eventSpeakerMap = new Map();
                if (speakerIds) {
                    for (let key in speakerIds) {
                        if (speakerIds.hasOwnProperty(key)) {
                            eventSpeakerMap.set(key, speakerMap.get(key));
                        }
                    }
                }

                eventMap.set(
                    key,
                    ConfEvent.toModel(
                        key,
                        jsEvent,
                        track,
                        eventRoomMap,
                        eventSpeakerMap
                    )
                );
            }
        }

        return {
            conf,
            sectionMap,
            trackMap,
            eventMap,
            roomMap,
            speakerMap
        };
    });
}
