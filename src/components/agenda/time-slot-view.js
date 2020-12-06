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
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { DateTimeUtils } from '../../utils/datetime-utils';
import { SessionView } from './session-view';

// < 768:  top-bottom layout --> default
// >= 768: left-right layout --> up('sm')
const styles = (theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        [theme.breakpoints.up('sm')]: {
            flexDirection: 'row',
        },
    },
    even: {
        backgroundColor: theme.palette.grey[850],
    },
    timeContainer: {
        padding: theme.spacing.unit * 3,
        borderBottom: `1px solid ${theme.palette.grey[800]}`,
        [theme.breakpoints.up('sm')]: {
            flex: '0 0 250px',
            padding: theme.spacing.unit * 4,
            borderBottom: 'none',
            borderRight: `1px solid ${theme.palette.grey[800]}`,
        },
    },
    timeRange: {
        color: theme.palette.primary.main,
        fontWeight: theme.typography.fontWeightBold,
        letterSpacing: 2,
    },
    sessionsContainer: {
        padding: theme.spacing.unit * 4,
    },
});

const decorate = withStyles(styles);

export const TimeSlotView = decorate(
    class extends React.Component {
        static propTypes = {
            eventStore: PropTypes.object.isRequired,
            timeSlot: PropTypes.object.isRequired,
            even: PropTypes.bool.isRequired,
        };

        render() {
            const { classes, eventStore, timeSlot, even } = this.props;

            return (
                <div
                    className={classNames(
                        classes.root,
                        even ? classes.even : null
                    )}
                >
                    <div className={classes.timeContainer}>
                        <Typography
                            variant="body2"
                            className={classes.timeRange}
                        >
                            {DateTimeUtils.timeRangeToShortStr(
                                timeSlot.startTime,
                                new Date(
                                    timeSlot.startTime.getTime() +
                                        timeSlot.duration
                                ),
                                eventStore.event.timezone
                            )}
                        </Typography>
                    </div>
                    <div className={classes.sessionsContainer}>
                        {timeSlot.sessions.map((session, index) => {
                            return (
                                <SessionView
                                    key={session.id}
                                    eventStore={eventStore}
                                    session={session}
                                    index={index}
                                />
                            );
                        })}
                    </div>
                </div>
            );
        }
    }
);
