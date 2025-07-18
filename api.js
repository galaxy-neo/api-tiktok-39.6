### contact me
**Contact for api :** [https://t.me/Neo_Galaxy](https://t.me/Neo_Galaxy)
## telegram: @Neo_Galaxy

"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_cookiejar_support_1 = require("axios-cookiejar-support");
const axios_1 = require("axios");
const JSONBig = require("json-bigint");
const qs = require("qs");
const tough_cookie_1 = require("tough-cookie");
const cryptography_1 = require("./cryptography");
const feed_1 = require("./feed");
const live_stream_1 = require("./live-stream");
const params_1 = require("./params");
class TikTokAPI {
    constructor(reqParams, apiConfig, requestConfig) {
        this.loginWithEmail = (email, password) => this.login({
            email: cryptography_1.encryptWithXOR(email),
            password: cryptography_1.encryptWithXOR(password),
        });
        this.loginWithUsername = (username, password) => this.login({
            username: cryptography_1.encryptWithXOR(username),
            password: cryptography_1.encryptWithXOR(password),
        });
        this.login = (params) => this.request.post('passport/user/login/', null, {
            params: Object.assign({ mix_mode: 1, username: '', email: '', mobile: '', account: '', password: '', captcha: '' }, params),
        })
            .then((res) => {
            if (res.headers['x-tt-token']) {
                this.request.defaults.headers.common['x-tt-token'] = res.headers['x-tt-token'];
            }
            return res;
        });
        this.getUser = (userId) => this.request.get('aweme/v1/user/', { params: { user_id: userId } });
        this.searchUsers = (params) => this.request.get('aweme/v1/discover/search/', {
            params: Object.assign({ type: 1 }, params_1.withDefaultListParams(params)),
        });
        this.getQRCode = (userId, schemaType = 4) => this.request.post('aweme/v1/fancy/qrcode/info/', qs.stringify({
            schema_type: schemaType,
            object_id: userId,
        }), {
            headers: {
                'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
            },
            params: {
                js_sdk_version: '',
                app_type: 'normal',
            },
        });
        this.getPost = (postId) => this.request.get('aweme/v1/aweme/detail/', {
            params: {
                aweme_id: postId,
            },
        });
        this.listPosts = (params) => this.request.get('aweme/v1/aweme/post/', {
            params: params_1.withDefaultListParams(params),
        });
        this.listFollowers = (params) => this.request.get('aweme/v1/user/follower/list/', {
            params: params_1.withDefaultListParams(params),
        });
        this.listFollowing = (params) => this.request.get('', {
            params: params_1.withDefaultListParams(params),
        });
        this.follow = (userId) => this.request.get('aweme/v1/commit/follow/user/', {
            params: {
                user_id: userId,
                type: 1,
            },
        });
        this.unfollow = (userId) => this.request.get('aweme/v1/commit/follow/user/', {
            params: {
                user_id: userId,
                type: 0,
            },
        });
        this.listReceivedFollowRequests = (params) => this.request.get('aweme/v1/user/following/request/list/', { params: params_1.withDefaultListParams(params) });
        this.approveFollowRequest = (userId) => this.request.get('aweme/v1/commit/follow/request/approve/', {
            params: {
                from_user_id: userId,
            },
        });
        this.rejectFollowRequest = (userId) => this.request.get('aweme/v1/commit/follow/request/reject/', {
            params: {
                from_user_id: userId,
            },
        });
        this.likePost = (postId) => this.request.get('aweme/v1/commit/item/digg/', {
            params: {
                aweme_id: postId,
                type: 1,
            },
        });
        this.unlikePost = (postId) => this.request.get('aweme/v1/commit/item/digg/', {
            params: {
                aweme_id: postId,
                type: 0,
            },
        });
        this.listComments = (params) => this.request.get('aweme/v1/comment/list/', {
            params: params_1.withDefaultListParams(Object.assign({ comment_style: 2, digged_cid: '', insert_cids: '' }, params)),
        });
        this.postComment = (postId, text, tags = []) => this.request.post('aweme/v1/comment/publish/', qs.stringify({
            text,
            aweme_id: postId,
            text_extra: tags,
            is_self_see: 0,
        }), {
            headers: {
                'content-type': 'application.x-www-form-urlencoded',
            },
        });
        this.listCategories = (params = { count: 10, cursor: 0 }) => this.request.get('aweme/v1/category/list/', {
            params: params_1.withDefaultListParams(params),
        });
        this.searchHashtags = (params) => this.request.get('aweme/v1/challenge/search/', {
            params: params_1.withDefaultListParams(params),
        });
        this.listPostsInHashtag = (params) => this.request.get('aweme/v1/challenge/aweme/', {
            params: params_1.withDefaultListParams(Object.assign({ query_type: 0, type: 5 }, params)),
        });
        this.listForYouFeed = (params) => this.request.get('aweme/v1/feed/', {
            params: params_1.withDefaultListParams(Object.assign({ count: 6, is_cold_start: 1, max_cursor: 0, pull_type: feed_1.PullType.LoadMore, type: feed_1.FeedType.ForYou }, params)),
        });
        this.listFollowingFeed = (params) => this.request.get('aweme/v1/feed/', {
            params: params_1.withDefaultListParams(Object.assign({ count: 6, is_cold_start: 1, max_cursor: 0, pull_type: feed_1.PullType.LoadMore, type: feed_1.FeedType.Following }, params)),
        });
        this.getSticker = (stickerId) => this.getStickers([stickerId]);

        // https://api2-16-h2-useast2a.musical.ly/aweme/v1/music/search/?ac=WIFI&op_region=ID&
        // app_skin=white&cursor=0&source=music&is_pull_refresh=0&query_correct_type=1&count=20&keyword=Dont%20blink&hot_search=0&is_author_search=1&
        this.getMusicSearch = (keyword, count, is_author_search) => this.request.get('aweme/v1/music/search/', {
            params: {
                app_skin: 'white',
                cursor: 0,
                source: 'music',
                is_pull_refresh: 0,
                query_correct_type: 1,
                count: count,
                keyword: keyword,
                hot_search: 0,
                is_author_search: is_author_search
            },
        });

        this.getMusicDetail = (music_id) => this.request.get('aweme/v1/music/detail/', {
            params: {
                music_id: music_id,
                click_reason: 1,
                app_skin: 'white'
            },
        });

        // https://api16-normal-c-useast2a.tiktokv.com/aweme/v1/music/aweme/?ac=WIFI&op_region=ID&app_skin=white&cursor=0&music_id=6753804384267683841&pull_type=2&count=18&type=6&

        this.getMusicAweme = (music_id) => this.request.get('aweme/v1/music/aweme/', {
            params: {
                app_skin: 'white',
                cursor: 0,
                music_id: music_id,
                pull_type: 2,
                count: 18,
                type: 6
            },
        });

        this.getStickers = (stickerIds) => this.request.get('aweme/v1/sticker/detail/', {
            params: {
                sticker_ids: stickerIds.join(','),
            },
        });
        this.listPostsBySticker = (params) => this.request.get('aweme/v1/sticker/aweme/', {
            params: params_1.withDefaultListParams(params),
        });
        this.joinLiveStream = (id) => this.request.get('aweme/v1/room/enter/', {
            params: {
                room_id: id,
            },
        });
        this.leaveLiveStream = (id) => this.request.get('aweme/v1/room/leave/', {
            params: {
                room_id: id,
            },
        });
        this.canStartLiveStream = () => this.request.get('aweme/v1/live/podcast/');
        this.startLiveStream = (title, contactsAuthorized = 0) => this.createLiveStreamRoom(title, contactsAuthorized)
            .then((createRoomRes) => {
            if (createRoomRes.data.status_code !== 0) {
                throw new Error(`The live stream room could not be created: ${JSON.stringify(createRoomRes.data)}`);
            }
            const { room } = createRoomRes.data;
            return this.updateLiveStreamStatus({
                room_id: room.room_id,
                stream_id: room.stream_id,
                status: live_stream_1.LiveStreamStatus.Started,
                reason_no: live_stream_1.LiveStreamStatusChangedReason.InitiatedByApp,
            }).then((updateStatusRes) => {
                if (updateStatusRes.data.status_code !== 0) {
                    throw new Error(`The live stream could not be started: ${JSON.stringify(updateStatusRes.data)}`);
                }
                return createRoomRes;
            });
        });
        this.endLiveStream = (roomId, streamId) => this.updateLiveStreamStatus({
            room_id: roomId,
            stream_id: streamId,
            status: live_stream_1.LiveStreamStatus.Ended,
            reason_no: live_stream_1.LiveStreamStatusChangedReason.InitiatedByUser,
        });
        this.createLiveStreamRoom = (title, contactsAuthorized = 0) => this.request.post('aweme/v1/room/create/', {
            params: {
                title,
                contacts_authorized: contactsAuthorized,
            },
        });
        this.updateLiveStreamStatus = (params) => this.request.get('aweme/v1/room/update/status/', {
            params: Object.assign({ status: live_stream_1.LiveStreamStatus.Ended, reason_no: live_stream_1.LiveStreamStatusChangedReason.InitiatedByUser }, params),
        });
        this.transformResponse = (data) => {
            if (!data || !data.length) {
                return data;
            }
            return JSONBig({ storeAsString: true }).parse(data);
        };
        this.signRequest = (config) => __awaiter(this, void 0, void 0, function* () {
            if (typeof config.paramsSerializer !== 'function') {
                throw new Error('Missing required paramsSerializer function');
            }
            const ts = Math.floor((new Date()).getTime() / 1000);
            const params = Object.assign({}, config.params, { ts, _rticket: new Date().getTime() });
            const url = `${config.baseURL}${config.url}?${config.paramsSerializer(params)}`;
            const signedURL = yield this.config.signURL(url, ts, this.request.defaults.params.device_id);
            return Object.assign({}, config, { url: signedURL, params: {} });
        });
        if (typeof apiConfig.signURL !== 'function') {
            throw new Error('You must supply a signURL function to the TikTokAPI config');
        }
        this.config = Object.assign({ baseURL: 'https://api2-16-h2.musical.ly/', host: 'api2-16-h2.musical.ly', userAgent: `com.zhiliaoapp.musically/${reqParams.manifest_version_code}`
                + ` (Linux; U; Android ${reqParams.os_version}; ${reqParams.language}_${reqParams.region};`
                + ` ${reqParams.device_type}; Build/NHG47Q; Cronet/58.0.2991.0)` }, apiConfig);
        this.cookieJar = new tough_cookie_1.CookieJar();
        this.request = axios_1.default.create(Object.assign({ paramsSerializer: params_1.paramsSerializer(params_1.paramsOrder), baseURL: this.config.baseURL, headers: {
                host: this.config.host,
                connection: 'keep-alive',
                'accept-encoding': 'gzip',
                'user-agent': this.config.userAgent,
                'sdk-version': 1,
                'x-ss-tc': 0
                'X-Gorgon': cryptography_1.x_gorgon,
                'X-Khronos': Math.round((new Date()).getTime() / 1000),
                'X-Ladon': cryptography_1.x_ladon,
                'X-Argus' cryptography_1.x_argus
            }, jar: this.cookieJar, params: reqParams, transformResponse: this.transformResponse, withCredentials: true }, requestConfig));
        axios_cookiejar_support_1.default(this.request);
        this.request.interceptors.request.use(this.signRequest);
    }
}
exports.default = TikTokAPI;
exports.getRequestParams = (requestParams) => (Object.assign({
  ts: Math.round((new Date()).getTime() / 1000),
  js_sdk_version: '',
  os_api: '28',
  device_type: 'TikTok 39.6.0 rv:228201 (iPhone; iOS 14.4.2; en_ID) Cronet',
  ssmix: 'a',
  manifest_version_code: '2019010729',
  dpi: '408',
  app_name: 'musical_ly',
  version_name: '39.6.0',
  timezone_offset: '36000',
  is_my_cn: '0',
  ac: 'wifi',
  update_version_code: '2019010729',
  channel: 'googleplay',
  device_platform: 'android',
  build_number: '39.6.0',
  version_code: '980',
  timezone_name: 'Europe/Berlin',
  resolution: '1080*2038',
  os_version: '9',
  device_brand: 'Android',
  mcc_mnc: '26201',
  app_language: 'de',
  language: 'de',
  region: 'DE',
  sys_region: 'DE',
  carrier_region: 'DE',
  carrier_region_v2: '262',
  _rticket: '1547244281022',
  aid: '1233',
  'pass-region': '1',
  'pass-route': '1'
}, requestParams));
