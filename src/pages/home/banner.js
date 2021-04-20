import React, { Component } from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import {BannerService} from '../../services/bannerService';

var Carousel = require("react-responsive-carousel").Carousel;

class Banner extends Component {
    constructor(props) {
        super(props);
        this.bannerService = new BannerService();
        this.state = {
            Banners: [],
            isFetch: true,
        };
    }
    async componentDidMount() {
        const banner = await this.bannerService.getVigentes();
        this.setState({ Banners: banner, isFetch: false })
    }
    render() {
        if (this.state.isFetch) {
            return '';
        } else {
            return (
                <Carousel showArrows={true} showThumbs={false} infiniteLoop={true} autoPlay={true}>
                    {
                     this.state.Banners.map((banners, key) =>
                        <div key={key}>
                            <img id='IconBanners' src={banners.banner} alt="" className="img-fluid" />
                        </div>
                    )}
                </Carousel>
            );
        }
    }
}

export default Banner;


