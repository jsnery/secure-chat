
$(document).ready(function () {
    $('#message').focus();
    $('#send-button').css('display', 'none');
});

// Carregar emojis
$(document).ready(function () {
    $(document).on('click', '#emojibutton', function () {
        console.log('Botão de emoji clicado');
        var emojitab = $('#emojitab');
        if (emojitab.css('display') === 'none') {
            console.log('Mostrando a aba de emojis');
            $('#emojitab').css('display', 'block');
            $('body').css('padding-bottom', '200px');
            $('#chat-container').scrollTop($('#chat-container')[0].scrollHeight);
        } else {
            console.log('Escondendo a aba de emojis');
            $('#emojitab').css('display', 'none');
            $('body').css('padding-bottom', '40px');
        }
    });

    $(document).on('click', '#message', function () {
        $('#emojitab').css('display', 'none');
        $('body').css('padding-bottom', '40px');
    });

    $(document).on('click', '#send-button', function () {
        $('#emojitab').css('display', 'none');
        $('body').css('padding-bottom', '40px');
    });

    $(document).on('click', '#chat-container', function () {
        $('#emojitab').css('display', 'none');
        $('body').css('padding-bottom', '40px');
    });

    $('.emoji').on('click', function () {
        $('#send-button').css('display', 'block');
        $('#record').css('display', 'none');
        // Obtém o emoji clicado
        var clickedEmoji = $(this).data('emoji');

        // Adiciona o emoji ao input do chat
        var chatInput = $('.msgtextinput');
        if (chatInput.length) {
            chatInput.val(chatInput.val() + clickedEmoji);
        } else {
            console.error('Campo de entrada do chat não encontrado');
        }
    });



});


// Carregar mensagens
$(document).ready(function () {
    var intervalId;
    var lastMessages = '';

    async function loadMessages() {
        const response = await fetch('/chat/messages');
        const data = await response.text();

        if (data !== lastMessages) {
            $('#chat-container').html(data);
            $('#chat-container').scrollTop($('#chat-container')[0].scrollHeight);
            $('#chat-container').find('audio').on('canplaythrough', function () {
                // Rolar para a parte inferior quando o áudio estiver pronto para ser reproduzido
                $('#chat-container').scrollTop($('#chat-container')[0].scrollHeight);
            });
            $('#chat-container').find('video').on('canplaythrough', function () {
                // Rolar para a parte inferior quando o áudio estiver pronto para ser reproduzido
                $('#chat-container').scrollTop($('#chat-container')[0].scrollHeight);
            });
            lastMessages = data;
        }
    }

    function startLoadingMessages() {
        loadMessages(); // Carregar mensagens na inicialização
        setInterval(loadMessages, 2000); // Recarregar mensagens a cada 1 segundo
    }

    startLoadingMessages();

    // Prevenir o comportamento padrão do formulário de recarregar a página
    $('#formSubmit').on('submit', function (e) {
        e.preventDefault();

        // Obter os dados do formulário
        var formData = $(this).serialize();

        // Enviar o formulário usando AJAX
        $.ajax({
            type: 'POST',
            url: $(this).attr('action'),
            data: formData
        })
            .done(function (response) {
                console.log('Cheguei aqui no Done: ' + response);
                $('.msgtextinput').val('');
                $('.msgtextinput').focus();
                $('#send-button').hide();
                $('#record').show();
            })
            .fail(function (jqXHR, textStatus, errorThrown) {
                console.error(textStatus, errorThrown);
            })
            .always(function () {
                console.log('Concluído');
                // Limpar a caixa de texto
                $('.msgtextinput').val('');
                $('.msgtextinput').focus();
                $('#send-button').hide();
                $('#record').show();
            });
    });

    $('#message').on('keypress', function (e) {
        if (e.which == 13) {
            e.preventDefault();
            $('#formSubmit').submit();
            $(this).val('');
        }
    });


    $(document).on('click', '.reply-button', function () {
        console.log('Botão de resposta clicado');
        var form = $(this).closest('div').parent().next('.reply-form');
        if (form.length) {
            form.toggle();
            if (form.is(':visible')) {
                console.log('Formulário de resposta aberto');
            } else {
                console.log('Formulário de resposta fechado');
            }
        } else {
            console.log('Formulário de resposta não encontrado');
        }
    });

    $(document).on('click', '.showhid-button', function () {
        console.log('Botão de resposta clicado');
        var replyButton = $(this).siblings('.reply-button');
        var deleteButton = $(this).siblings('.deletemsg-button');
        var replyForm = $(this).closest('div').parent().next('.reply-form');
        if (replyButton.is(':visible') || deleteButton.is(':visible')) {
            $(this).html('<i class="material-icons" style="font-size: 16px; color: #ffffff;">chevron_right</i>');
            replyButton.hide();
            deleteButton.hide();
            replyForm.hide();  // Esconde o formulário de resposta
        } else {
            $(this).html('<i class="material-icons" style="font-size: 16px; color: #00FFFF;">chevron_left</i>');
            replyButton.show();
            deleteButton.show();
        }
    });

    $(document).on('click', '.showhid2-button', function () {
        console.log('Botão de resposta clicado');
        var replyButton = $(this).siblings('.reply-button');
        var deleteButton = $(this).siblings('.deletemsg-button');
        var replyForm = $(this).closest('div').parent().next('.reply-form');
        if (replyButton.is(':visible') || deleteButton.is(':visible')) {
            $(this).html('<i class="material-icons" style="font-size: 16px; color: #ffffff;">chevron_left</i>');
            replyButton.hide();
            deleteButton.hide();
            replyForm.hide();  // Esconde o formulário de resposta
        } else {
            $(this).html('<i class="material-icons" style="font-size: 16px; color: #00FFFF;">chevron_right</i>');
            replyButton.show();
            deleteButton.show();
        }
    });

    $(document).on('click', '.deletemsg-button', function () {
        console.log('Botão de deletar mensagem clicado');
        var userId = $(this).attr('user-id');

        $.ajax({
            url: '/chat/delete',
            type: 'POST',
            data: { 'message_id': userId },
            success: function (result) {
                // Faça algo com o resultado aqui
                console.log(result);
            },
            error: function (xhr, status, error) {
                // Trate o erro aqui
                console.log(error);
            }
        });
    });
});


// Envio de arquivos (IMG focus)
$(document).ready(function () {
    $('#photo-input').on('change', function () {
        var file = this.files[0];
        var formData = new FormData();
        formData.append('photo', file);

        let server_name = document.getElementById('server-name').value;

        $.ajax({
            url: '/chat/encrypt_server_name',
            type: 'POST',
            data: { server_name: server_name },
            success: function (response) {
                encryptedServer = response.encryptedServer;
            }
        });

        $.ajax({
            url: '/chat/upload', // A URL para a qual o arquivo de imagem é enviado
            type: 'post',
            data: formData,
            contentType: false,
            processData: false,
            success: function (response) {
                var filename = response.filename;  // Use o nome do arquivo retornado pelo servidor
                var message;

                if (filename.toLowerCase().endsWith('.jpg') || filename.toLowerCase().endsWith('.png') || filename.toLowerCase().endsWith('.gif') || filename.toLowerCase().endsWith('.jpeg') || filename.toLowerCase().endsWith('.webp') || filename.toLowerCase().endsWith('.svg') || filename.toLowerCase().endsWith('.bmp') || filename.toLowerCase().endsWith('.ico') || filename.toLowerCase().endsWith('.tif') || filename.toLowerCase().endsWith('.tiff') || filename.toLowerCase().endsWith('.jfif') || filename.toLowerCase().endsWith('.jp2') || filename.toLowerCase().endsWith('.jpe') || filename.toLowerCase().endsWith('.jif') || filename.toLowerCase().endsWith('.jfi') || filename.toLowerCase().endsWith('.jxr') || filename.toLowerCase().endsWith('.hdp') || filename.toLowerCase().endsWith('.wdp') || filename.toLowerCase().endsWith('.heif') || filename.toLowerCase().endsWith('.heic') || filename.toLowerCase().endsWith('.avif') || filename.toLowerCase().endsWith('.apng') || filename.toLowerCase().endsWith('.flif') || filename.toLowerCase().endsWith('.webp') || filename.toLowerCase().endsWith('.pdf') || filename.toLowerCase().endsWith('.svg')) {
                    message = '<img id="senfimg" src="./chatx/' + encryptedServer + '/img/' + filename + '" alt=" Imagem apagada do servidor" style="width: 100%;">';
                } else if (filename.toLowerCase().endsWith('.mp4') || filename.toLowerCase().endsWith('.webm')) {
                    message = '<video id="senfimg" width="100%" height="100%" style="width: 100%; height: 100%; margin: 0;" controls><source src="./chatx/' + encryptedServer + '/videos/' + filename + '" type="video/mp4">Your browser does not support the video tag.</video>  ';
                } else if (filename.toLowerCase().endsWith('.apk')) {
                    message = '<button class="btn" style="width: 100%;"><a href="./chatx/' + encryptedServer + '/others/' + filename + '" download style="color: white;">Atualizar Aplicativo</a></button><br>';
                }

                $.ajax({
                    url: '/chat', // A URL para a qual a mensagem é enviada
                    type: 'post',
                    data: { message: message },
                    success: function () {
                        // Atualizar a página de chat atual com a nova mensagem
                        $('#chat-container').html(data);
                        $('#chat-container').scrollTop($('#chat-container')[0].scrollHeight);
                    }
                });
            }
        });
    });
});


// Gravar audio
let server_name = document.getElementById('server-name').value;

$.ajax({
    url: '/chat/encrypt_server_name',
    type: 'POST',
    data: { server_name: server_name },
    success: function (response) {
        encryptedServer = response.encryptedServer;
    },
    error: function (request, status, error) {
        console.error('Error:', error);
        console.error('Status:', status);
        console.error('Request:', request);
    }
});

let mediaRecorder;
let audioChunks = [];
let stream;

document.querySelector('#record').addEventListener('click', () => {
    if (!mediaRecorder || mediaRecorder.state === "inactive") {
        if (!stream) {
            navigator.mediaDevices.getUserMedia({ audio: true })
                .then(str => {
                    stream = str;
                    if (window.MediaRecorder) {
                        mediaRecorder = new MediaRecorder(stream);
                        mediaRecorder.addEventListener("dataavailable", event => {
                            audioChunks.push(event.data);
                        });
                        mediaRecorder.addEventListener("stop", () => {
                            uploadRecording(audioChunks);
                        });
                        audioChunks = [];
                        document.querySelector('#record').classList.remove('btn-primary');
                        document.querySelector('#record').classList.add('btn-danger');
                        mediaRecorder.start();
                    } else {
                        console.error('MediaRecorder not supported on this browser');
                    }
                })
                .catch(error => {
                    console.error('Error accessing microphone:', error);
                });
        } else {
            audioChunks = [];
            document.querySelector('#record').classList.remove('btn-primary');
            document.querySelector('#record').classList.add('btn-danger');
            mediaRecorder.start();
        }
    } else {
        mediaRecorder.stop();
        stream.getAudioTracks().forEach(track => track.stop());
        stream = null;
        document.querySelector('#record').classList.remove('btn-danger');
        document.querySelector('#record').classList.add('btn-primary');
    }
});

function uploadRecording(audioChunks) {
    const audioBlob = new Blob(audioChunks);
    const formData = new FormData();
    formData.append('file', audioBlob, 'recording.wav');

    fetch('/chat/audio', {
        method: 'POST',
        body: formData
    }).then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.text();  // Converta a resposta em texto
    }).then(filename => {
        console.log('File uploaded successfully. Filename:', filename);  // Log do nome do arquivo
        var message;
        if (filename.toLowerCase().endsWith('.wav')) {
            message = '<audio id="myAudio" controls controlsList="nodownload"><source src="./chatx/' + encryptedServer + '/audios/' + filename + '" type="audio/wav"></audio>';
        }

        $.ajax({
            url: '/chat', // A URL para a qual a mensagem é enviada
            type: 'post',
            data: { message: message },
            success: function () {
                // Atualizar a página de chat atual com a nova mensagem
                $('#chat-container').html(data);
                $('#chat-container').scrollTop($('#chat-container')[0].scrollHeight);
            }
        });

    }).catch(error => {
        console.error('There has been a problem with your fetch operation:', error);
    });
}


// Enviar mensagem e gravar audio button
document.querySelector('#message').addEventListener('input', function () {
    if ($(this).val().trim() === '') {
        $('#send-button').hide();
        $('#record').show();
    } else {
        $('#send-button').show();
        $('#record').hide();
    }
});
