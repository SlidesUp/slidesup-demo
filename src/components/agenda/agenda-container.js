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
import Typography from '@material-ui/core/Typography';
import { getEvent } from '../../services/event.service';
import { BusyIndicator } from '../basics/busy-indicator';
import { CenteredContainer } from '../basics/centered-container';
import { AgendaPage } from './agenda-page';

export class AgendaContainer extends React.Component {
    state = {
        loading: true,
        error: null,
        eventStore: null,
    };

    componentDidMount() {
        const eventId = process.env.REACT_APP_EVENT_ID;
        return getEvent(eventId)
            .then((eventStore) => {
                this.setState({
                    loading: false,
                    error: null,
                    eventStore: eventStore,
                });
            })
            .catch((error) => {
                this.setState({
                    loading: false,
                    error: error,
                    eventStore: null,
                });
            });
    }

    render() {
        if (this.state.loading) {
            return (
                <CenteredContainer>
                    <BusyIndicator />
                </CenteredContainer>
            );
        } else if (this.state.error) {
            return (
                <CenteredContainer>
                    <Typography variant="title">
                        ${this.state.error.message}
                    </Typography>
                </CenteredContainer>
            );
        } else {
            return <AgendaPage eventStore={this.state.eventStore} />;
        }
    }
}
