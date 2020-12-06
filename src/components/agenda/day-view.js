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
import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import { TimeSlot } from '../../models/time-slot';
import { DateTimeUtils } from '../../utils/datetime-utils';
import { Headline } from '../basics/typography';
import { TimeSlotView } from './time-slot-view';

const styles = (theme) => ({
    root: {
        margin: '32px 32px 80px 32px',
    },
    subheading: {
        fontFamily: theme.typography.fontFamilySerif,
        fontStyle: 'italic',
        color: theme.palette.text.secondary,
        marginBottom: theme.spacing.unit * 7,
    },
});

const decorate = withStyles(styles);

export const DayView = decorate(
    class extends React.Component {
        static propTypes = {
            eventStore: PropTypes.object.isRequired,
            day: PropTypes.object.isRequired,
        };

        render() {
            const { classes, eventStore, day } = this.props;
            const { sessionMap } = eventStore;
            const timeSlots = this.groupSessionsByTimeSlots(sessionMap, day);

            return (
                <section className={classes.root}>
                    <Headline>{day.name}</Headline>
                    <Typography
                        variant="subheading"
                        className={classes.subheading}
                    >
                        {DateTimeUtils.dateToDayDate(
                            day.startTime,
                            eventStore.event.timezone
                        )}
                    </Typography>
                    {timeSlots.map((timeSlot, index) => {
                        return (
                            <TimeSlotView
                                key={index}
                                timeSlot={timeSlot}
                                eventStore={eventStore}
                                even={index % 2 === 0}
                            />
                        );
                    })}
                </section>
            );
        }

        groupSessionsByTimeSlots(sessionMap, day) {
            // Collect the sessions for this day
            const sessions = Array.from(sessionMap.values()).filter(
                (session) => {
                    if (!session.startTime) {
                        return false;
                    }
                    return (
                        day.startTime <= session.startTime &&
                        session.startTime < day.endTime
                    );
                }
            );

            // Sort sessions by start time & then by duration
            sessions.sort((e1, e2) => {
                const startDiff = e1.startTime - e2.startTime;
                const durationDiff = e1.duration - e2.duration;
                return startDiff !== 0 ? startDiff : durationDiff;
            });

            // Group by time slots
            const timeSlots = [];
            sessions.forEach((session) => {
                if (timeSlots.length === 0) {
                    timeSlots.push(new TimeSlot(session));
                } else {
                    const currentSlot = timeSlots[timeSlots.length - 1];
                    if (currentSlot.accepts(session)) {
                        currentSlot.add(session);
                    } else {
                        timeSlots.push(new TimeSlot(session));
                    }
                }
            });

            return timeSlots;
        }
    }
);
