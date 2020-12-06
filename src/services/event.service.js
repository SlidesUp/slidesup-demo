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
import { SuEvent } from '../models/su-event';
import { Session } from '../models/session';
import { Room } from '../models/room';
import { EventDay } from '../models/event-day';
import { Profile } from '../models/profile';
import { Track } from '../models/track';

const getEventPath = (eventId) => `events/summary/${eventId}`;
const getDaysPath = (eventId) => `events/detail/${eventId}/days`;
const getTracksPath = (eventId) => `events/detail/${eventId}/tracks`;
const getSessionsPath = (eventId) => `events/detail/${eventId}/sessions`;
const getRoomsPath = (eventId) => `events/detail/${eventId}/rooms`;
const getProfilessPath = (eventId) => `events/detail/${eventId}/profiles`;

export function getEvent(eventId) {
    const promises = [];
    promises.push(firebase.database().ref(getEventPath(eventId)).once('value'));
    promises.push(firebase.database().ref(getDaysPath(eventId)).once('value'));
    promises.push(
        firebase.database().ref(getTracksPath(eventId)).once('value')
    );
    promises.push(
        firebase.database().ref(getSessionsPath(eventId)).once('value')
    );
    promises.push(firebase.database().ref(getRoomsPath(eventId)).once('value'));
    promises.push(
        firebase.database().ref(getProfilessPath(eventId)).once('value')
    );

    return Promise.all(promises).then((snapshots) => {
        const jsEvent = snapshots[0].val();
        const jsDayMap = snapshots[1].val();
        const jsTrackMap = snapshots[2].val();
        const jsSessionMap = snapshots[3].val();
        const jsRoomMap = snapshots[4].val();
        const jsProfileMap = snapshots[5].val();

        const event = SuEvent.toModel(eventId, jsEvent);

        const dayMap = new Map();
        for (let key in jsDayMap) {
            if (jsDayMap.hasOwnProperty(key)) {
                dayMap.set(key, EventDay.toModel(key, jsDayMap[key]));
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

        const profileMap = new Map();
        for (let key in jsProfileMap) {
            if (jsProfileMap.hasOwnProperty(key)) {
                profileMap.set(key, Profile.toModel(key, jsProfileMap[key]));
            }
        }

        const sessionMap = new Map();
        for (let key in jsSessionMap) {
            if (jsSessionMap.hasOwnProperty(key)) {
                const jsSession = jsSessionMap[key];
                const { trackId, roomIds, speakerIds } = jsSession;

                const track = trackId ? trackMap.get(trackId) : null;

                const sessionRoomMap = new Map();
                if (roomIds) {
                    for (let key in roomIds) {
                        if (roomIds.hasOwnProperty(key)) {
                            sessionRoomMap.set(key, roomMap.get(key));
                        }
                    }
                }

                const sessionSpeakerMap = new Map();
                if (speakerIds) {
                    for (let key in speakerIds) {
                        if (speakerIds.hasOwnProperty(key)) {
                            sessionSpeakerMap.set(key, profileMap.get(key));
                        }
                    }
                }

                sessionMap.set(
                    key,
                    Session.toModel(
                        key,
                        jsSession,
                        track,
                        sessionRoomMap,
                        sessionSpeakerMap
                    )
                );
            }
        }

        return {
            event,
            dayMap,
            trackMap,
            sessionMap,
            roomMap,
            profileMap,
        };
    });
}
