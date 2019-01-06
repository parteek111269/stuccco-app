/*
** This class contain all configurations variables, and will be used as global variable can be accessed from everywhere
*  Just import like this
*  import {Env} from '../../environments/environment';  
*/

//Core API BASE URL AND BASE VERSION
// export var baseUrl:any = 'http://dev.stuccco.com/';
export var baseUrl:any = 'http://192.168.1.15:3000/';
// export var baseUrl:any = 'https://stuccco.com/';
// export var baseUrl:any = localStorage.getItem("prodbaseUrl") + '/';
// export var baseUrl:any = localStorage.getItem("devbaseUrl") + '/';
// export var apiUrl:any = localStorage.getItem("apiUrl");
export var apiUrl: string = 'api/v1/';
export var fbAppID:number = 588257707983471; //FB APP ID
// for dev
export var stripeKey: string = 'pk_test_tck9EwPCF4bpMYTTQpxXeURN';
// for live
// export var stripeKey: string = 'pk_live_V1XgeHUL6ssmvNxvYygQRRhm';
// stripe live keys
// STRIPE_PUBLISHABLE_KEY = "pk_live_V1XgeHUL6ssmvNxvYygQRRhm"
// STRIPE_SECRET_KEY = "sk_live_bYzwHmCE8jyPGhHwi677wIOy"
//--------------------------------
        /*API END POINTS*/
//--------------------------------

//Login EndPoints
export var login:any = 'users/login';
export var states:any = 'users/states'; 
export var designerType:any = 'users/user_types '; 
export var checkEmail:any = 'users/check_email'; 
export var checkUserName:any = 'users/check_username'; 
export var register:any = 'users/register';
export var facebook_auth:any = 'users/authenticate_fb_login';
//FULL URL
export var forgotPasswordUrl = 'users/password/new'
export var termAndConditionUrl = 'termsofuse';

// plans end point
export var plans:any = 'get_packages';
export var about:any = 'about_page';
//Inspiration Page full Url
export var inspoUrl = 'inspiration/home';
export var recentInspoUrl = 'inspiration/recent';
export var popularPageUrl ='inspiration/popular';
export var inspoSingleImageUrl = 'inspiration/single_image_data';
export var inspoContentEndUrl = 'This is your inspiration home area there is some technical error so this made does not show any content Please Try again! or switch to other page';

export var postLike = 'inspiration/like'; 
export var postComment = 'inspiration/comment';
export var postStick = '';
export var getCollectionList = '';
export var deletePostComment = 'inspiration/delete_comment';
export var editPostComment = 'inspiration/edit_comment';
export var getComment = 'get_comments/';

// Checkout Page End Url
export var checkOutEndUrl = 'projects'

//--------------------------------
        /*DYNAMIC TEXT END POINTS*/ 
//---------------------------------

// Text FOR TAB TITLE
 export var designer:any = 'DESIGNERS';
 export var news:any = 'NEWS';
 export var inspiration:any = 'PHOTOS';
 export var message:any = 'MESSAGES';
 export var market: any = 'MARKET';
 
 // Text For Registration form
 export var emailExist:any ="Email already exist";
 export var userNameExist:any = "Username already exist";
 


//--------------------------------------------------------------
    /*Designer Section api end points*/
//--------------------------------------------------------------
    
export var designerList:any ='projects/designers';    
    
 
//--------------------------------------------------------------
    /*Designer text start from here*/
//--------------------------------------------------------------
    
export var designerTitle:any ='Which designer would you like to book?';
export var designerInstantTitle:any ='Choose Instant Book to make your pick.';
export var takeTour:any = 'Take a Tour';
export var checkout:any = 'Countinue To Checkout';
export var roomType:any = 'Room Type: Not Selected';
export var stylePrefrences:any = 'style prefrences: Not Selected';

//--------------------------------------------------------------
    /*CheckOut page Here*/
//--------------------------------------------------------------

export var checkOutimageUrl:any = 'assets/project-styles/';
export var storeImageUrl:any = 'assets/stores/'


//--------------------------------------------------------------
    /*Project listing*/
//--------------------------------------------------------------

export var projectlisting:any = 'projects';
export var projectChangeStatusUrl:any = 'mark_complete';
export var imageUploadUrl:any = 'projects/store_project_attachments';
export var projectListingEndUrlError:any = 'This is project listing area there is some technical error so this made does not show any content Please Try again!';
export var projectDeatilEndUrlError:any = 'This is project Deatil area there is some technical error so this made does not show any content Please Try again!';

//--------------------------------------------------------------
    /*In app NOtifications/News */
//--------------------------------------------------------------
export var NotificationEndUrl:any = 'notifications';

//--------------------------------------------------------------
    /*Profile section end url*/
//--------------------------------------------------------------
    
export var userInfo:any = '/user_info'; 
export var userCollections:any = '/collections'; 
export var userCreations:any = '/creations';    
export var userLikes:any = '/likes';
export var addProfileRating:any = 'add_rating';    
export var updateProfileRating:any = 'edit_rating';    
export var userFollowers:any = '/followers';
export var userFollowing:any = '/followings';
export var followUserProfile:any = 'follow_user';
export var unfollowUserProfile:any = '/un_follow_user';
export var EditCollection:any = 'edit_collection/';
export var updateCollection = 'update_collection';
export var deleteCollection = 'delete_collection/';
export var teamMemberlistData = 'get_team_members/';
export var editCreation = 'edit_album/';
export var updateCreation = 'update_album';
export var deleteCreation = 'delete_album/';
export var creationDetail = '/creation/'
export var newCreations = 'get_creations';
export var uploadImage = 'upload_homeprof_image';
export var postNewCreation = 'add_image';
export var replaceCreationImage = 'edit_homeprof_image';
export var updateCreationImage = 'update_image';
export var collectionContent:any = 'This is your Collections area. Think of Collections as albums that store your favorite photos on Stuccco. Most Collections store related photos and are given names like, "Bathroom remodel ideas" or "Master Bedroom decor." You can have as many Collections - and as many photos Stuck in them - as you want.';
export var creativeContent:any = 'This is your Creations area. There aren’t any photos here because you haven’t added a Creation yet. Think of Creations as albums that store the photos you’ve added to Stuccco. Most Creations store related photos and are given names like, “Winstown Bathroom Remodel” or “Johnston Custom Home.” You can have as many Creations - and as many photos contained in them - as you want.';
export var likesContent:any = "It looks like you haven't liked any photos yet. Get started by liking a photo. A list of the photos you've liked on Stuccco will be visible here.";
export var activitiesContent:any = 'This is your activity area. There aren’t any photos here because you haven’t any create image yet. To show this page content you need to create album';
export var followingsContent:any = "It looks like you're not following anyone... yet! When you follow others, a list of the accounts you follow will be visible here.";
export var followersContent:any = 'It looks like nobody is following you... yet! When others follow you, a list of your followers will be visible here.';
export var reviewsContent:any = 'This is your review area. There aren’t any review here because your profile haven’t any one review yet';

export var collectionContentEndUrlFailed:any = 'This is Collection area there is some technical error so this made does not show any content Please Try again!';
export var creativeContentEndUrlFailed:any = 'This is Creation area there is some technical error so this made does not show any content Please Try again!';
export var likesContentEndUrlFailed:any = 'This is likes area there is some technical error so this made does not show any content Please Try again!';
export var activitiesContentEndUrlFailed:any = 'This is activity area there is some technical error so this made does not show any content Please Try again!';
export var followingsContentEndUrlFailed:any = 'This is following area there is some technical error so this made does not show any content Please Try again!';
export var followersContentEndUrlFailed:any = 'This is Followers area there is some technical error so this made does not show any content Please Try again!';
export var reviewsContentEndUrlFailed:any = 'This is your review area there is some technical error so this made does not show any content Please Try again!';


//--------------------------------------------------------------
    /*Profile Setting section end url*/
//--------------------------------------------------------------

export var profileSetting = 'settings/';
export var uploadTeamMemberImageUrl = 'upload_team_image';
export var updateProfile = 'update_profile';
export var profileSubscription = 'get_notifications/';
export var subscription = 'notification_setting';
export var updateUserProfile = 'update_user_profile';

//--------------------------------------------------------------
    /*conversation detail*/
//--------------------------------------------------------------

export var conversationDetail = 'conversations';
export var conversationAllData = 'conversations/';
export var conversationMessage = 'conversation_messages';
export var messagelist = 'conversations';
export var postMessages = 'conversation_messages';
export var uploadAttachments = 'upload_message_image';
export var messageCount = 'messages_count';
export var conversationDelete = 'delete_conversation/';
export var downloadAttachment = 'download_attachment_rest/';
export var deleteAttachmentFile = 'delete_message_attachment/'

//-------------------------------------------------------------
    /*In APP BROWSER END URL*/

// review api

export var aboutReview = 'about_reviews?page='; 

// ------------------------------------------------------------

// cover slider api

export var coverSlider = 'get_slider/';

// market templates

export var marketTemplates = 'templates';
export var purchaseTemplate = '/purchase_template'
export var marketTemplatesPage = 'templates?page=';
export var userTemplate = '/user_templates'

// feeds
export var feeds = 'feeds';

// products
export var product = 'templates/inventory?inven_type=';
export var productDetail = 'templates/inventory_det/?template_id=';
export var downloaddesign = 'templates/download_design/?template_id='

// advice
export var adviceDetail = 'discussions/';
export var upload_asset = 'upload_asset'
export var create_question = 'create_question'
export var deleteAdvice = 'delete_question';
export var editAdvice = 'update_question';
export var getadvicecomment = 'comments'
export var addcomment = 'create_answer';
export var delComment = 'delete_answer';
export var editComment = 'update_answer';
export var notificationCount = 'notification_count';
export var updateNotification = 'update_notifications';
export var clearMessages = 'update_messages';
export var logout = 'users/user_sign_out';
export var initialNotificationStatus = 'users/app_notification_status';
export var updateNotificationStatus = 'users/app_notification_preferences';
// FCM details
// Server key: AAAAMC4b2z4:APA91bGgVDQda3j0vLejvrk6ETn-aV2Fq6A2vq55-2OqLHV8qMx04GmHMpmJvMa15pBetFpBCMp74FbRXrDE8nMhs8VKUrLRpdNergLPjM1_OAaG1ioxzWSEm9-Qr8VAskNj9yMZ6QR2
// Legacy server key: AIzaSyCu3O9Oow-LqqrTIr2TK0DEZWuuaWH9BF4
// Sender ID: 206932007742