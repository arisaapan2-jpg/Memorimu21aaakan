const chatBox = document.getElementById('chat-box');
const input = document.getElementById('user-input');
const sendBtn = document.getElementById('send-btn');
const loader = document.getElementById('loader');
const sidebar = document.getElementById('sidebar');

// FIX JAM REALTIME
setInterval(() => {
    const time = new Date().toLocaleTimeString('id-ID', { hour12: false });
    document.getElementById('clock').innerText = time;
}, 1000);

function toggleSidebar() {
    sidebar.classList.toggle('sidebar-hidden');
}

function addBubble(text, type) {
    const div = document.createElement('div');
    div.className = `msg ${type}`;
    div.innerHTML = text.replace(/\n/g, '<br>');
    chatBox.appendChild(div);
    chatBox.scrollTop = chatBox.scrollHeight;
}

function hapusChat() {
    chatBox.innerHTML = "";
    addBubble("Data chat telah dibersihkan, Tuan Wahyu.", "bot");
    toggleSidebar();
}

function quickCmd(v) {
    input.value = v;
    processAI(v);
}

// SISTEM RESPON PINTAR (MENJAWAB APA SAJA)
async function processAI(query) {
    if (!query.trim()) return;
    const p = query.toLowerCase();
    
    addBubble(query, 'user');
    input.value = "";
    loader.classList.remove('hidden');

    setTimeout(() => {
        loader.classList.add('hidden');

        // LOGIKA JAWABAN
        if (p.includes("script") || p.includes("luau")) {
            addBubble("🛠️ **SCRIPT GENERATED**\nIni adalah basis script untuk proyek Tuan:\n\n```lua\nlocal Player = game.Players.LocalPlayer\nprint('Wahyu Supreme AI Active!')\n
```", "bot");
        } 
        else if (p.includes("siapa") || p.includes("nama")) {
            addBubble("Saya adalah **Supreme AI**, asisten digital yang dirancang khusus untuk Tuan Wahyu. Saya bisa membantu koding dan manajemen tugas.", "bot");
        }
        else if (p.includes("logo")) {
            const seed = Math.floor(Math.random() * 999);
            addBubble(`🎨 **LOGO DESIGN**\n<img src="https://api.dicebear.com/7.x/bottts/svg?seed=${seed}" width="80" style="margin-top:10px; border:1px solid cyan;">`, "bot");
        }
        else if (p.includes("web")) {
            addBubble("🌐 **WEB FRAMEWORK**\nStruktur HTML dasar telah disiapkan. Ketik '/help' untuk melihat perintah lainnya.", "bot");
        }
        else {
            // Jawaban default jika tidak ada kata kunci (agar terasa pintar)
            addBubble("Perintah diterima, Tuan Wahyu. Saya telah memproses instruksi tersebut ke dalam sistem. Ada hal lain yang bisa saya bantu? 🌸", "bot");
        }
    }, 1000);
}

sendBtn.addEventListener('click', () => processAI(input.value));
input.addEventListener('keypress', (e) => { if (e.key === 'Enter') processAI(input.value); });
