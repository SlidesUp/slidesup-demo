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
import React, { Fragment } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import { Header } from './header';
import { DayView } from './day-view';

const styles = (theme) => ({
    main: {
        maxWidth: 1280,
        margin: '0 auto',
    },
    title: {
        padding: theme.spacing.unit * 4,
        marginTop: theme.spacing.unit * 8,
        color: theme.palette.text.primary,
    },
});

const decorate = withStyles(styles);

export const AgendaPage = decorate(
    class extends React.Component {
        static propTypes = {
            eventStore: PropTypes.object.isRequired,
        };

        render() {
            const { classes, eventStore } = this.props;

            // Sort days by start time
            const days = Array.from(eventStore.dayMap.values());
            days.sort((s1, s2) => {
                return s1.startTime - s2.startTime;
            });

            return (
                <Fragment>
                    <Header title={eventStore.event.name} />
                    <main className={classes.main}>
                        <Typography
                            variant="display1"
                            className={classes.title}
                        >
                            AGENDA
                        </Typography>
                        {days.map((day) => {
                            return (
                                <DayView
                                    key={day.id}
                                    eventStore={eventStore}
                                    day={day}
                                />
                            );
                        })}
                    </main>
                </Fragment>
            );
        }
    }
);
