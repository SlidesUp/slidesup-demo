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
import { Headline } from '../basics/typography';
import { SessionDetail } from './session-detail';

const styles = (theme) => ({
    root: {
        display: 'flex',
    },
    marginTop: {
        marginTop: theme.spacing.unit * 7,
    },
    speakerImage: {
        flex: `0 0 ${theme.spacing.unit * 8}px`,
        height: theme.spacing.unit * 8,
        marginRight: theme.spacing.unit * 3,
        '& img': {
            maxWidth: '100%',
            maxHeight: '100%',
            filter: 'grayscale(100%)',
        },
    },
    subheading: {
        color: theme.palette.text.secondary,
    },
    sessionInfo: {
        cursor: 'pointer',
    },
});

const decorate = withStyles(styles);

export const SessionView = decorate(
    class extends React.Component {
        static propTypes = {
            eventStore: PropTypes.object.isRequired,
            session: PropTypes.object.isRequired,
            index: PropTypes.number.isRequired,
        };

        state = {
            showDetail: false,
        };

        render() {
            const { classes, eventStore, session, index } = this.props;
            const { speakerMap } = session;
            const speaker =
                speakerMap.size > 0 ? Array.from(speakerMap.values())[0] : null;

            return (
                <div
                    className={classNames(
                        classes.root,
                        index > 0 ? classes.marginTop : null
                    )}
                >
                    {speaker && (
                        <div className={classes.speakerImage}>
                            <img src={speaker.pictureUrl} alt={speaker.name} />
                        </div>
                    )}
                    <div
                        className={classes.sessionInfo}
                        onClick={this.handleClickShowDetail}
                    >
                        <Headline>{session.name}</Headline>
                        {speaker && (
                            <Typography
                                variant="subheading"
                                className={classes.subheading}
                            >
                                {speaker.name}
                            </Typography>
                        )}
                    </div>
                    <SessionDetail
                        eventStore={eventStore}
                        session={session}
                        open={this.state.showDetail}
                        onClose={this.handleClose}
                    />
                </div>
            );
        }

        handleClickShowDetail = () => {
            this.setState({ showDetail: true });
        };

        handleClose = () => {
            this.setState({ showDetail: false });
        };
    }
);
