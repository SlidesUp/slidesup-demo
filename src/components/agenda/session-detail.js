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
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import PropTypes from 'prop-types';
import { DateTimeUtils } from '../../utils/datetime-utils';
import { SpeakerProfile } from './speaker-profile';

const styles = (theme) => ({
    header: {
        display: 'flex',
        paddingBottom: 10,
    },
    titleBlock: {
        flex: 1,
    },
    title: {
        marginBottom: 4,
    },
    closeButton: {
        marginTop: -theme.spacing.unit,
        marginLeft: theme.spacing.unit * 4,
    },
    subheading: {
        color: theme.palette.text.secondary,
        fontSize: theme.typography.pxToRem(14),
        lineHeight: 1.4,
    },
    speakerProfile: {
        marginTop: theme.spacing.unit * 3,
    },
});

const decorate = withStyles(styles);

export const SessionDetail = decorate(
    class extends React.Component {
        static propTypes = {
            eventStore: PropTypes.object.isRequired,
            session: PropTypes.object.isRequired,
            open: PropTypes.bool.isRequired,
            onClose: PropTypes.func.isRequired,
        };

        render() {
            const { classes, eventStore, session, open, onClose } = this.props;
            const {
                name,
                startTime,
                duration,
                track,
                roomMap,
                speakerMap,
                description,
            } = session;
            const speaker =
                speakerMap.size > 0 ? Array.from(speakerMap.values())[0] : null;
            const roomsString = this.formatRooms(roomMap);
            const trackString = this.formatTrack(track);

            return (
                <Dialog
                    aria-labelledby="session-detail-title"
                    open={open}
                    onClose={onClose}
                >
                    <DialogTitle
                        id="session-detail-title"
                        className={classes.header}
                        disableTypography={true}
                    >
                        <div className={classes.titleBlock}>
                            <Typography
                                variant="title"
                                className={classes.title}
                            >
                                {name}
                            </Typography>
                            <Typography
                                variant="subheading"
                                className={classes.subheading}
                            >
                                {DateTimeUtils.timeRangeToShortStr(
                                    startTime,
                                    new Date(startTime.getTime() + duration),
                                    eventStore.event.timezone
                                )}
                            </Typography>

                            <Typography
                                variant="subheading"
                                className={classes.subheading}
                            >
                                {roomsString ? (
                                    <span>{roomsString}</span>
                                ) : null}
                                {roomsString && trackString ? ' • ' : null}
                                {trackString ? (
                                    <span>{trackString}</span>
                                ) : null}
                            </Typography>
                        </div>
                        <IconButton
                            className={classes.closeButton}
                            aria-label="Close"
                            onClick={onClose}
                        >
                            <CloseIcon />
                        </IconButton>
                    </DialogTitle>

                    <DialogContent>
                        <Typography
                            variant="body1"
                            dangerouslySetInnerHTML={{ __html: description }}
                        />

                        {speaker && (
                            <SpeakerProfile
                                speaker={speaker}
                                className={classes.speakerProfile}
                            />
                        )}
                    </DialogContent>
                </Dialog>
            );
        }

        formatRooms(roomMap) {
            if (roomMap.size === 0) {
                return null;
            }

            return Array.from(roomMap.values())
                .map((room) => {
                    return room.name;
                })
                .join(', ');
        }

        formatTrack(track) {
            return track ? track.name : null;
        }
    }
);
