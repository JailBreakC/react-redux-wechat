import React, { Component } from 'react';
import './MessageContent.less';

class MessageContent extends Component {
  render() {
    return (
      <div className="message-content">
        <div className="top-placeholder" style={{'height': '0px'}}></div>
        <div class="message-item">
          <div className="clearfix">
            <div style={{'overflow': 'hidden'}}>
              <div className="message me">
                <div className="message_system">
                  <div className="content">15:20</div>
                </div>
                <img className="avatar" src="https://static.insta360.com/assets/operation/0054/c9916bbe2ef5ee76d22b2ae990e498d3/WechatIMG1.jpeg" />
                <div className="content">
                  <div className="bubble js_message_bubble bubble_primary right">
                    <div className="bubble_cont">
                      <div className="plain">
                        <pre className="js_message_plain">1</pre>
                        <img className="ico_loading hide" src="//res.wx.qq.com/a/wx_fed/webwx/res/static/img/25x4Rho.gif" alt="" />
                        <i className="ico_fail web_wechat_message_fail hide" title="重新发送"></i>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="message-item">
            <div className="clearfix">
                <div style={{'overflow': 'hidden'}}>
                    <div className="message you">
                        <img className="avatar" src="https://static.insta360.com/assets/operation/0054/50b95bebec22f5427849ff9c0b8b63e2/liuyi.jpg" title="刘毅" />
                        <div className="content">
                            <div className="bubble js_message_bubble bubble_default left">
                                <div className="bubble_cont ">
                                    <div className="plain">
                                        <pre className="js_message_plain">那个还款是多少</pre>
                                        <img className="ico_loading" src="//res.wx.qq.com/a/wx_fed/webwx/res/static/img/25x4Rho.gif" alt="" />
                                        <i className="ico_fail web_wechat_message_fail" title="重新发送"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className="bottom-placeholder" style={{'height': '0px'}}></div>
      </div>
    )
  }
}

export default MessageContent;

