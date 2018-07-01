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

const styles = theme => ({
    root: {
        margin: '32px 32px 80px 32px'
    },
    subheading: {
        fontFamily: theme.typography.fontFamilySerif,
        fontStyle: 'italic',
        color: theme.palette.text.secondary,
        marginBottom: theme.spacing.unit * 7
    }
});

const decorate = withStyles(styles);

export const SectionView = decorate(
    class extends React.Component {
        static propTypes = {
            confStore: PropTypes.object.isRequired,
            section: PropTypes.object.isRequired
        };

        render() {
            const { classes, confStore, section } = this.props;
            const { eventMap } = confStore;
            const timeSlots = this.groupEventsByTimeSlots(eventMap, section);

            return (
                <section className={classes.root}>
                    <Headline>{section.name}</Headline>
                    <Typography
                        variant="subheading"
                        className={classes.subheading}
                    >
                        {DateTimeUtils.dateToDayDate(
                            section.startTime,
                            confStore.conf.timezone
                        )}
                    </Typography>
                    {timeSlots.map((timeSlot, index) => {
                        return (
                            <TimeSlotView
                                key={index}
                                timeSlot={timeSlot}
                                confStore={confStore}
                                even={index % 2 === 0}
                            />
                        );
                    })}
                </section>
            );
        }

        groupEventsByTimeSlots(eventMap, section) {
            // Collect the events for this section
            const events = Array.from(eventMap.values()).filter(event => {
                if (!event.startTime) {
                    return false;
                }
                return (
                    section.startTime <= event.startTime &&
                    event.startTime < section.endTime
                );
            });

            // Sort events by start time & then by duration
            events.sort((e1, e2) => {
                const startDiff = e1.startTime - e2.startTime;
                const durationDiff = e1.duration - e2.duration;
                return startDiff !== 0 ? startDiff : durationDiff;
            });

            // Group by time slots
            const timeSlots = [];
            events.forEach(event => {
                if (timeSlots.length === 0) {
                    timeSlots.push(new TimeSlot(event));
                } else {
                    const currentSlot = timeSlots[timeSlots.length - 1];
                    if (currentSlot.accepts(event)) {
                        currentSlot.add(event);
                    } else {
                        timeSlots.push(new TimeSlot(event));
                    }
                }
            });

            return timeSlots;
        }
    }
);
