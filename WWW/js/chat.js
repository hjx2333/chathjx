var app  = {
    view: {},
    formData: {         
        target: '',
        target_img: '',
        socket: null,
        connectType: false,
        url: window.location.href.indexOf('https://chathjx.herokuapp.com/') != -1 ? 'https://chathjx.herokuapp.com/' : 'http://localhost:3000/',
        user: {
            username: '',
            uid: '',
            img: ''
        }
    },
    components: {
        initMethod: function(){
            app.view.screenFuc = function(){
                var topHeight = $(".chatBox-head").innerHeight();//聊天头部高度
                //屏幕小于768px时候,布局change
                var winWidth = $(window).innerWidth();
                if (winWidth <= 768) {
                    var totalHeight = $(window).height(); //页面整体高度
                    $(".chatBox-info").css("height", totalHeight - topHeight);
                    var infoHeight = $(".chatBox-info").innerHeight();//聊天头部以下高度
                    //中间内容高度
                    $(".chatBox-content").css("height", infoHeight - 46);
                    $(".chatBox-content-demo").css("height", infoHeight - 56);

                    $(".chatBox-list").css("height", totalHeight - topHeight);
                    $(".chatBox-kuang").css("height", totalHeight - topHeight);
                    $(".div-textarea").css("width", winWidth - 106);
                } else {
                    $(".chatBox-info").css("height", 495);
                    $(".chatBox-content").css("height", 448);
                    $(".chatBox-content-demo").css("height", 438);
                    $(".chatBox-list").css("height", 495);
                    $(".chatBox-kuang").css("height", 495);
                    $(".div-textarea").css("width", 260);
                }
            };
            
            //登录
            app.view.loginValidate = function(password){
                $.post(app.formData.url + 'loginValidate', {'password': password}, function(data){
                    if(data.status == 'success'){
                        app.formData.socket = io.connect();
                        app.components.initWatch();                            
                        console.log(data);
                        $('.dialog').css('display', 'none');
                        $("#username").text(data.username);
                        app.view.onLoadData(data.uid);
                        app.formData.user.username = data.username;
                        app.formData.user.uid = data.uid;
                        app.formData.user.img = data.img;
                    }else {
                        $('.dialog').css('display', 'block');
                        $('.input_name').css('display', 'block');   
                        alert('密码错误');
                    }                      
                });
            };

            app.view.onLoadData = function(uid){
                $.post(app.formData.url + 'pagelist', {'uid': uid}, function(jd){
                    var html = '';
                    for(i in jd.data){
                        html += '<div class="chat-list-people" id="'+ jd.data[i].uid +'"><div><img src="'+ jd.data[i].img +'" alt="头像"\/>' +
                            '</div><div class="chat-name">' +
                            '<p data-uid="'+ jd.data[i].uid +'">'+ jd.data[i].username +'<\/p><\/div><div class="message-num" style="display: none;"><\/div><\/div>';
                    }
                    $('.chatBox-list').append(html);

                    //进聊天页面
                    $(".chat-list-people").each(function () {
                        $(this).click(function () {
                            app.formData.target = $(this).find('p').attr('data-uid');   
                            $(this).find('.message-num').text('');                     
                            $(this).find('.message-num').css('display', 'none');     
                            app.formData.target_img = $(this).find('img').attr('src');                                                
                            var n = $(this).index();
                            $(".chatBox-head-one").toggle();
                            $(".chatBox-head-two").toggle();
                            $(".chatBox-list").fadeToggle();
                            $(".chatBox-kuang").fadeToggle();

                            if(!$('#chatBox-content-' + app.formData.target).length){
                                $('.chatBox-content').append('<div class="chatBox-content-demo" id="chatBox-content-'+ app.formData.target +'"></div>');
                            }else {
                                $('.chatBox-content-demo').siblings().css('display', 'none');
                                $('#chatBox-content-' + app.formData.target).css('display', 'block');
                            }

                            //传名字
                            $(".ChatInfoName").text($(this).children(".chat-name").children("p").eq(0).html());

                            //传头像
                            $(".ChatInfoHead>img").attr("src", $(this).children().eq(0).children("img").attr("src"));

                            //聊天框默认最底部
                            $(document).ready(function () {
                                $('#chatBox-content-' + app.formData.target).scrollTop($('#chatBox-content-' + app.formData.target)[0].scrollHeight);
                            });

                            app.view.screenFuc();
                        })
                    });
                })
            }
        },

        initWatch: function(){
            app.formData.socket.on('getMsg', function(data){ 
                var html = '';      
                //判断是否是自己发送的消息            
                if(data.name == $('#username').text()){
                    data.type == 'img' ? html = "<img src='"+ data.body +"' alt=''>" : html = data.body;
                    //创建气泡
                    $('#chatBox-content-' + app.formData.target).append("<div class=\"clearfloat\">" +
                        "<div class=\"author-name\"><small class=\"chat-date\">2017-12-02 14:26:58</small> </div> " +
                        "<div class=\"right\"> <div class=\"chat-message\"> " + html + " </div> " +
                        "<div class=\"chat-avatars\"><img src='"+ app.formData.user.img +"' alt=\"头像\" /></div> </div> </div>");                
                }else {
                    if(!$('#chatBox-content-' + data.uid).length) $('.chatBox-content').append('<div class="chatBox-content-demo" id="chatBox-content-'+ data.uid +'"></div>');
                    data.type == 'img' ? html = "<img src='"+ data.body +"' alt=''>" : html = data.body;
                    //创建气泡
                    $('#chatBox-content-' + data.uid).append("<div class=\"clearfloat\">" +
                        "<div class=\"author-name\"><small class=\"chat-date\">2017-12-02 14:26:58</small> </div> " +
                        "<div class=\"left\">  <div class=\"chat-avatars\"><img src='"+ data.img +"' alt=\"头像\" /></div>  " +
                        "<div class=\"chat-message\"> " + html + " </div></div></div>");      
                        
                    if($('.chatBox-kuang').css('display') == 'none' || data.uid != app.formData.target){
                        var parent = '#' + data.uid;
                        $(parent + ' .message-num').text() == '' ? $(parent + ' .message-num').text(1) : $(parent + ' .message-num').text(parseInt($(parent + ' .message-num').text()) + 1);
                        $(parent + ' .message-num').css('display', 'block');
                    }
                }

                //聊天框默认最底部
                $(document).ready(function () {
                    setTimeout(function(){
                        $('#chatBox-content-' + app.formData.target).scrollTop($('#chatBox-content-' + app.formData.target)[0].scrollHeight);
                    }, 100);
                });
            });

            app.formData.socket.on('disconnect', function() {
                app.formData.connectType = false;                    
                console.log("与服务器断开");
                setTimeout(function(){
                    console.log("主动与服务器断开");                        
                    if(!app.formData.connectType) app.formData.socket.disconnect();
                }, 10000);
                //主动关闭连接
                // app.formData.socket.disconnect();
            });

            app.formData.socket.on('reconnect', function() {
                app.formData.connectType = true;
                console.log("重新连接到服务器");
            });

            app.formData.socket.on('loginValidate', function(){
                window.location.reload();
            })
        },

        initEvent: function(){
            $(document).on('keypress', function(e){
                if(e.keyCode == 13){
                    e.preventDefault();
                    if($('.dialog').css("display") == 'block'){
                        var password = $('#user').val();
                        if(password){                           
                            $('.dialog p').text('connecting to server...');  
                            app.view.loginValidate(password);
                        }
                    }else {
                        $('#chat-fasong').trigger('click');                      
                    } 
                }
            });

            //发送信息
            $("#chat-fasong").click(function () {
                var textContent = $(".div-textarea").html().replace(/[\n\r]/g, '<br>');
                if (textContent != "") {
                    app.formData.socket.emit('postMsg', {target: app.formData.target, body: textContent, user: app.formData.user});
                    //发送后清空输入框
                    $(".div-textarea").html("");
                }
            });

            //发送表情
            $("#chat-biaoqing").click(function () {
                $(".biaoqing-photo").toggle();
            });
            $(document).click(function () {
                $(".biaoqing-photo").css("display", "none");
            });
            $("#chat-biaoqing").click(function (event) {
                event.stopPropagation();//阻止事件
            });

            $(".emoji-picker-image").each(function () {
                $(this).click(function () {
                    var position = $(this).css('background-position');
                    var index = $(this).attr('title');
                    var obj = {
                        position: position,
                        target: app.formData.target,
                        body: 'emoji:' + index, 
                        user: app.formData.user
                    };
                    $('.div-textarea').html($('.div-textarea').text() + '<span class="emoji-picker-image" contenteditable="false" style="background-position:'+ obj.position +'"></span>');
                    // app.formData.socket.emit('img', obj);
                    //发送后关闭表情框
                    $(".biaoqing-photo").toggle();
                    //聊天框默认最底部
                    $(document).ready(function () {
                        $("#chatBox-content-" + app.formData.target).scrollTop($("#chatBox-content-" + app.formData.target)[0].scrollHeight);
                    });
                })
            });

            //发送图片
            $("#chat-tuxiang").click(function(){
                $("#selectImg").trigger("click");
            });
            
            $("#selectImg").change(function(){
                var file = this.files[0];
                var reader = new FileReader(); 
                reader.readAsDataURL(file); 
                reader.onload = function(e){  
                    var that = this;
                    app.formData.socket.emit("img", {target: app.formData.target, body: that.result, user: app.formData.user});
                }      
            });

            //打开/关闭聊天框
            $(".chatBtn").click(function () {
                $(".chatBox").toggle(10);
            })
            $(".chat-close").click(function () {
                $(".chatBox").toggle(10);
            })
            
            //返回列表
            $(".chat-return").click(function () {
                $(".chatBox-head-one").toggle(1);
                $(".chatBox-head-two").toggle(1);
                $(".chatBox-list").fadeToggle(1);
                $(".chatBox-kuang").fadeToggle(1);
                $(".chatBox-content-demo").css('display', 'none');
            });                

            (window.onresize = function () {
                app.view.screenFuc();
            })();

        },

        initBody: function(){
            this.initMethod();

            this.initEvent();
        }
    }
};