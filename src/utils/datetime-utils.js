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
import moment from 'moment';
import 'moment-timezone';
import 'moment-duration-format';

export class DateTimeUtils {
    /**
     * @param {Date} date
     * @param {string} timezone
     * @returns {string} e.g. Monday, January 1
     */
    static dateToDayDate(date, timezone) {
        if (!date || !timezone) {
            return null;
        }

        return moment(date)
            .tz(timezone)
            .format('dddd, MMMM D');
    }

    /**
     * @param {Date} time
     * @param {string} timezone
     * @returns {string} e.g. 9:00 AM
     */
    static timeToTStr(time, timezone) {
        if (!time || !timezone) {
            return null;
        }

        return moment(time)
            .tz(timezone)
            .format('h:mm A');
    }

    /**
     * @param {Date} startTime
     * @param {Date} endTime
     * @param {string} timezone
     * @returns {string} e.g. 9:00 AM - 10:00 AM
     */
    static timeRangeToShortStr(startTime, endTime, timezone) {
        if (!startTime || !endTime || !timezone) {
            return null;
        }

        return `${DateTimeUtils.timeToTStr(
            startTime,
            timezone
        )} - ${DateTimeUtils.timeToTStr(endTime, timezone)}`;
    }

    /**
     * @param {string} durationStr - duration in formats acceptable to moment, e.g. PT1H30M (ISO 8601), 01:30
     * @returns {number} duration in milliseconds
     */
    static durationStrToMillis(durationStr) {
        return moment.duration(durationStr).asMilliseconds();
    }
}
