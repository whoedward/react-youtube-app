import _ from 'lodash';
import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import YTSearch from 'youtube-api-search';
import VideoList from './components/video_list';
import VideoDetail from './components/video_detail';

import SearchBar from './components/search_bar';

const API_KEY = 'AIzaSyBcm4Y7WmY9mdz0x-AaNPAMmvJRLMwc3cg';


// Create a new component. This component should produce HTML
class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            videos: [],
            selectedVideo: null
        };

        this.videoSearch('surfboards');
    }

    videoSearch(term) {
        YTSearch({key:API_KEY,term}, videos =>{
            this.setState({
                videos,
                selectedVideo: videos[0]
            })
        });
    }
    render() {
        const videoSearch = _.debounce((term)=> {this.videoSearch(term)},300);
        return (
            <div>
                <SearchBar onSearchTermChange={videoSearch}/>
                <VideoDetail video={this.state.selectedVideo}/>
                <VideoList
                    onVideoSelect={selectedVideo => this.setState({selectedVideo})}
                    videos={this.state.videos} />
            </div>
        );
    }
}

// Take this component's generated HTML and put it in the DOM
ReactDOM.render(<App/>, document.querySelector('.container'));
