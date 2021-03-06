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
import { DateTimeUtils } from '../utils/datetime-utils';

export class Session {
    id;
    name;
    isPublished;
    isGeneralSession;
    startTime;
    duration;
    track;
    roomMap;
    speakerMap;
    description;

    /**
     * @param {string} id
     * @param {string} name
     * @param {boolean} isPublished
     * @param {boolean} isGeneralSession
     * @param {Date} [startTime]
     * @param {number} [duration] (milliseconds)
     * @param {Track} [track]
     * @param {Map} [roomMap]
     * @param {Map} [speakerMap]
     * @param {string} [description] - This is an HTML string
     */
    constructor(
        id,
        name,
        isPublished = false,
        isGeneralSession = false,
        startTime = null,
        duration = null,
        track = null,
        roomMap,
        speakerMap,
        description
    ) {
        this.id = id;
        this.name = name;
        this.isPublished = isPublished;
        this.isGeneralSession = isGeneralSession;
        this.startTime = startTime;
        this.duration = duration;
        this.track = track;
        this.roomMap = roomMap;
        this.speakerMap = speakerMap;
        this.description = description;
    }

    static toModel(id, jsSession, track, roomMap, speakerMap) {
        const {
            name,
            isPublished,
            isGeneralSession,
            startTime,
            duration,
            description,
        } = jsSession;

        return new Session(
            id,
            name,
            isPublished,
            isGeneralSession,
            startTime ? new Date(startTime) : null,
            duration ? DateTimeUtils.durationStrToMillis(duration) : null,
            track,
            roomMap,
            speakerMap,
            description
        );
    }
}
