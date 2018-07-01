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
export class Section {
    id;
    name;
    title;
    startTime;
    endTime;

    /**
     * @param {string} id
     * @param {string} name
     * @param {string} title
     * @param {Date} [startTime]
     * @param {Date} [endTime]
     */
    constructor(id, name, title, startTime, endTime) {
        this.id = id;
        this.name = name;
        this.title = title;
        this.startTime = startTime;
        this.endTime = endTime;
    }

    static toModel(id, jsSection) {
        const { startTime, endTime } = jsSection;

        return new Section(
            id,
            jsSection.name,
            jsSection.title,
            startTime ? new Date(startTime) : null,
            endTime ? new Date(endTime) : null
        );
    }
}
