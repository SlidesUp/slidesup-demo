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
export class TimeSlot {
    startTime;
    duration;
    events = [];

    /**
     * TimeSlot is initialized using the first event that is put into it
     * @param {ConfEvent} [event]
     */
    constructor(event) {
        this.startTime = event.startTime;
        this.duration = event.duration;
        this.events.push(event);
    }

    accepts(event) {
        return (
            event.startTime.getTime() === this.startTime.getTime() &&
            event.duration === this.duration
        );
    }

    add(event) {
        this.events.push(event);
    }
}
