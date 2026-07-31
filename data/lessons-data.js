/* lessons-data.js — Conteúdo das 5 aulas fixas, embutido diretamente no JS.
   Gerado a partir de data/aulas.json e data/aula1..5.json.
   Embutir os dados evita a necessidade de um servidor HTTP: o site
   funciona mesmo abrindo o index.html direto com duplo clique. */

const AULAS_INDEX = {
  "aulas": [
    {
      "id": "aula1",
      "numero": 1,
      "titulo": "Introdução à IoT",
      "resumo": "Definição, aplicações e desafios gerais da Internet das Coisas.",
      "icone": "network"
    },
    {
      "id": "aula2",
      "numero": 2,
      "titulo": "Componentes e Funcionalidades",
      "resumo": "Sensores, atuadores, conectividade, processamento e IA na IoT.",
      "icone": "chip"
    },
    {
      "id": "aula3",
      "numero": 3,
      "titulo": "Planejamento de Projetos IoT",
      "resumo": "Definição do problema, metodologia SMART, testes e segurança.",
      "icone": "gear"
    },
    {
      "id": "aula4",
      "numero": 4,
      "titulo": "Segurança e Privacidade",
      "resumo": "Desafios de segurança, GDPR, CCPA e boas práticas.",
      "icone": "lock"
    },
    {
      "id": "aula5",
      "numero": 5,
      "titulo": "Origem, Aplicações e Avanços",
      "resumo": "História da IoT, aplicações atuais e tecnologias emergentes.",
      "icone": "clock"
    }
  ]
};

const AULAS_CONTEUDO = {
  "aula1": {
    "id": "aula1",
    "numero": 1,
    "titulo": "Introdução à IoT",
    "leitura_inicial": "A Internet das Coisas (IoT) conecta objetos do cotidiano à internet, permitindo que enviem e recebam dados. Ela é um dos pilares da Indústria 4.0, transforma casas e cidades em ambientes inteligentes e chega até a agricultura. Apesar dos benefícios, enfrenta desafios de segurança cibernética, privacidade e interoperabilidade entre dispositivos.",
    "questoes": [
      {
        "tipo": "multipla",
        "icone": "network",
        "leitura": "\"A Internet das Coisas, conhecida como IoT, é uma tecnologia revolucionária que conecta dispositivos do dia a dia à internet, permitindo que eles recebam e enviem dados.\"",
        "pergunta": "Segundo o texto, o que caracteriza a Internet das Coisas (IoT)?",
        "opcoes": [
          "A conexão de dispositivos do cotidiano à internet para troca de dados",
          "Um tipo de rede social voltada para eletrodomésticos",
          "Um sistema operacional exclusivo para smartphones",
          "Uma linguagem de programação para automação industrial"
        ],
        "correta": 0,
        "explicacao": "A IoT é definida justamente pela conexão de objetos comuns (eletrodomésticos, veículos, acessórios) à internet, permitindo que recebam e enviem dados de forma automatizada."
      },
      {
        "tipo": "vf",
        "icone": "factory",
        "leitura": "\"No contexto industrial, a IoT é um pilar da chamada Indústria 4.0, onde máquinas interconectadas e inteligentes melhoram significativamente a eficiência da produção.\"",
        "pergunta": "A IoT é considerada um dos pilares da Indústria 4.0.",
        "correta": true,
        "explicacao": "O texto afirma explicitamente que a IoT é um pilar da Indústria 4.0, contribuindo para monitoramento em tempo real, manutenção preditiva e personalização em massa."
      },
      {
        "tipo": "multipla",
        "icone": "city",
        "leitura": "\"Nas cidades, sensores IoT são utilizados para monitorar tudo, desde o tráfego até a qualidade do ar, ajudando a melhorar a gestão dos recursos urbanos.\"",
        "pergunta": "Nas cidades inteligentes, os sensores IoT são usados principalmente para:",
        "opcoes": [
          "Substituir totalmente os órgãos de trânsito",
          "Monitorar tráfego, qualidade do ar e uso de recursos urbanos",
          "Vender produtos para os moradores",
          "Controlar exclusivamente o transporte público"
        ],
        "correta": 1,
        "explicacao": "Sensores espalhados pela cidade monitoram tráfego, qualidade do ar e recursos como água e energia, apoiando uma gestão urbana mais eficiente."
      },
      {
        "tipo": "multipla",
        "icone": "farm",
        "leitura": "\"Na agricultura, o uso de sensores e dispositivos conectados permite aos agricultores monitorar as condições do solo, clima e culturas em tempo real.\"",
        "pergunta": "Qual é o principal benefício da IoT aplicada à agricultura, segundo o texto?",
        "opcoes": [
          "Eliminar totalmente a necessidade de irrigação",
          "Aplicação precisa de água e fertilizantes, reduzindo desperdício e impacto ambiental",
          "Substituir os agricultores por robôs autônomos",
          "Aumentar o uso de pesticidas para garantir a produtividade"
        ],
        "correta": 1,
        "explicacao": "O monitoramento em tempo real do solo, clima e culturas permite decisões mais precisas sobre irrigação e fertilizantes, tornando a produção mais sustentável e econômica."
      },
      {
        "tipo": "vf",
        "icone": "gear",
        "leitura": "\"A interoperabilidade é essencial para que dispositivos de diferentes fabricantes possam trabalhar juntos de forma eficiente, sem criar silos de informação inacessíveis.\"",
        "pergunta": "A interoperabilidade não é um problema para a IoT, pois todos os fabricantes usam exatamente os mesmos protocolos.",
        "correta": false,
        "explicacao": "Pelo contrário: o texto destaca a interoperabilidade como um desafio significativo, já que dispositivos de fabricantes diferentes nem sempre se comunicam bem entre si."
      },
      {
        "tipo": "multipla",
        "icone": "lock",
        "leitura": "\"A IoT enfrenta desafios significativos, especialmente em termos de segurança cibernética, privacidade de dados e interoperabilidade entre diferentes dispositivos e sistemas.\"",
        "pergunta": "Qual das opções abaixo NÃO é citada no texto como um desafio da IoT?",
        "opcoes": [
          "Segurança cibernética",
          "Privacidade de dados",
          "Interoperabilidade entre dispositivos",
          "Excesso de fornecimento de energia elétrica gratuita"
        ],
        "correta": 3,
        "explicacao": "O texto cita segurança cibernética, privacidade de dados e interoperabilidade como os principais desafios da IoT — energia gratuita não é mencionada em nenhum momento."
      },
      {
        "tipo": "multipla",
        "icone": "home",
        "leitura": "\"Por exemplo, uma geladeira inteligente pode detectar a falta de algum alimento e fazer o pedido online automaticamente, enquanto relógios inteligentes monitoram a saúde do usuário.\"",
        "pergunta": "No exemplo da geladeira inteligente citado no texto, o que ela é capaz de fazer?",
        "opcoes": [
          "Detectar a falta de um alimento e fazer o pedido online automaticamente",
          "Ligar para o supermercado por chamada de voz apenas",
          "Imprimir uma lista de compras em papel",
          "Enviar um e-mail semanal com receitas culinárias"
        ],
        "correta": 0,
        "explicacao": "O texto usa esse exemplo justamente para ilustrar como objetos comuns viram dispositivos inteligentes capazes de agir automaticamente com base em dados coletados."
      },
      {
        "tipo": "multipla",
        "icone": "factory",
        "leitura": "\"Nas indústrias, a IoT é um pilar da chamada Indústria 4.0, que representa a quarta revolução industrial, marcada pela automação e pela troca de dados em tempo real.\"",
        "pergunta": "A Indústria 4.0, mencionada no texto, é descrita como:",
        "opcoes": [
          "A primeira revolução industrial, baseada no uso do vapor",
          "A quarta revolução industrial, marcada pela automação e troca de dados em tempo real",
          "Um movimento apenas de marketing sem aplicação real",
          "Uma revolução exclusiva do setor agrícola"
        ],
        "correta": 1,
        "explicacao": "A Indústria 4.0 é caracterizada pela automação e pela troca de dados em larga escala e em tempo real entre máquinas interconectadas."
      }
    ]
  },
  "aula2": {
    "id": "aula2",
    "numero": 2,
    "titulo": "Componentes e Funcionalidades Essenciais da IoT",
    "leitura_inicial": "Todo dispositivo IoT combina sensores (que captam dados do ambiente), atuadores (que executam ações físicas), conectividade (Wi-Fi, Bluetooth, Zigbee, redes celulares) e um 'cérebro' de processamento — microcontroladores ou microprocessadores. A junção disso com Inteligência Artificial e Aprendizado de Máquina permite que os dispositivos aprendam padrões e tomem decisões autônomas.",
    "questoes": [
      {
        "tipo": "multipla",
        "icone": "sensor",
        "leitura": "\"Os sensores coletam informações do ambiente, como temperatura, umidade e movimento, enquanto os atuadores realizam ações físicas em resposta a esses dados.\"",
        "pergunta": "Qual é a função dos sensores em um dispositivo IoT?",
        "opcoes": [
          "Executar ações físicas como abrir válvulas",
          "Coletar informações do ambiente, como temperatura e movimento",
          "Armazenar dados exclusivamente na nuvem",
          "Substituir a necessidade de conectividade"
        ],
        "correta": 1,
        "explicacao": "Os sensores são os 'olhos' do dispositivo: captam dados do ambiente (temperatura, umidade, movimento) que serão usados para tomar decisões."
      },
      {
        "tipo": "multipla",
        "icone": "gear",
        "leitura": "\"Um atuador pode ser utilizado para abrir ou fechar válvulas em um sistema de irrigação inteligente, baseando-se nas informações de umidade do solo coletadas por sensores.\"",
        "pergunta": "O que é um atuador, segundo o texto?",
        "opcoes": [
          "Um componente que apenas armazena dados históricos",
          "Um dispositivo que realiza ações físicas em resposta aos dados dos sensores",
          "Um tipo de sensor de temperatura",
          "Um protocolo de conectividade sem fio"
        ],
        "correta": 1,
        "explicacao": "Enquanto o sensor capta dados, o atuador é quem 'age no mundo real', como abrir uma válvula de irrigação com base na umidade do solo detectada."
      },
      {
        "tipo": "vf",
        "icone": "network",
        "leitura": "\"A conectividade é outro pilar essencial na IoT [...] Isso pode ser alcançado através de diversas tecnologias como Wi-Fi, Bluetooth, Zigbee, ou redes celulares.\"",
        "pergunta": "Wi-Fi, Bluetooth e Zigbee são exemplos de tecnologias de conectividade citadas no texto para dispositivos IoT.",
        "correta": true,
        "explicacao": "O texto cita exatamente essas tecnologias, cuja escolha depende de fatores como alcance, consumo de energia e natureza dos dados transmitidos."
      },
      {
        "tipo": "multipla",
        "icone": "chip",
        "leitura": "\"Microcontroladores são tipicamente usados em aplicações onde a eficiência energética e a execução de tarefas específicas são prioritárias, enquanto microprocessadores são empregados em situações que exigem maior capacidade de processamento.\"",
        "pergunta": "Qual a principal diferença entre microcontroladores e microprocessadores em dispositivos IoT?",
        "opcoes": [
          "Microcontroladores processam mais dados que microprocessadores",
          "Microcontroladores priorizam eficiência energética e tarefas específicas; microprocessadores lidam com tarefas mais complexas",
          "Não existe diferença prática entre eles",
          "Microprocessadores só funcionam sem conexão à internet"
        ],
        "correta": 1,
        "explicacao": "Microcontroladores são voltados a tarefas simples e de baixo consumo de energia; microprocessadores suportam sistemas operacionais mais complexos e múltiplas aplicações simultâneas."
      },
      {
        "tipo": "multipla",
        "icone": "cloud",
        "leitura": "\"O processamento local pode ser útil para ações rápidas e em tempo real, enquanto o armazenamento e processamento em nuvem permitem análises mais complexas e o uso de inteligência artificial.\"",
        "pergunta": "Qual a principal vantagem do processamento em nuvem em relação ao processamento local?",
        "opcoes": [
          "Permite análises mais complexas e uso de inteligência artificial",
          "É sempre mais rápido para ações em tempo real",
          "Elimina totalmente a necessidade de sensores",
          "Não depende de conectividade com a internet"
        ],
        "correta": 0,
        "explicacao": "O processamento em nuvem oferece maior capacidade de análise, incluindo o uso de IA para otimizar decisões, como na manutenção preditiva — já o processamento local é melhor para respostas imediatas."
      },
      {
        "tipo": "multipla",
        "icone": "brain",
        "leitura": "\"Em uma fábrica, sensores podem detectar o desgaste de equipamentos e, com o aprendizado de máquina, é possível prever quando uma máquina precisará de manutenção antes que ela realmente quebre.\"",
        "pergunta": "No exemplo da fábrica, qual é o papel do Aprendizado de Máquina (ML) combinado à IoT?",
        "opcoes": [
          "Substituir totalmente os sensores físicos",
          "Prever a necessidade de manutenção antes que a máquina quebre",
          "Aumentar o consumo de energia dos equipamentos",
          "Impedir qualquer tipo de automação"
        ],
        "correta": 1,
        "explicacao": "Ao processar os dados captados pelos sensores, os modelos de ML identificam padrões de desgaste e antecipam falhas, evitando paradas inesperadas e custosas."
      },
      {
        "tipo": "vf",
        "icone": "lock",
        "leitura": "\"Algoritmos de aprendizado de máquina podem detectar padrões anormais que podem indicar tentativas de invasão ou falhas de segurança, permitindo respostas rápidas para mitigar esses riscos.\"",
        "pergunta": "O Aprendizado de Máquina, além de melhorar a funcionalidade, também pode contribuir para a segurança dos dispositivos IoT.",
        "correta": true,
        "explicacao": "Algoritmos de ML podem identificar padrões anormais no comportamento dos dispositivos, ajudando a detectar tentativas de invasão de forma mais rápida."
      },
      {
        "tipo": "multipla",
        "icone": "network",
        "leitura": "\"A conectividade é crucial para o sucesso da IA e ML na IoT, pois permite a troca de dados entre dispositivos e sistemas de processamento, seja localmente ou na nuvem.\"",
        "pergunta": "Por que a conectividade é essencial para que a IA e o ML funcionem bem na IoT?",
        "opcoes": [
          "Porque permite a troca contínua de dados entre dispositivos e sistemas de processamento",
          "Porque substitui a necessidade de sensores",
          "Porque impede que os dados sejam atualizados",
          "Porque é usada apenas para fins estéticos das interfaces"
        ],
        "correta": 0,
        "explicacao": "Sem conectividade, os modelos de ML não conseguiriam receber novos dados continuamente para se atualizar e melhorar sua precisão ao longo do tempo."
      }
    ]
  },
  "aula3": {
    "id": "aula3",
    "numero": 3,
    "titulo": "Planejamento e Desenvolvimento de Soluções IoT",
    "leitura_inicial": "Um projeto de IoT bem-sucedido começa pela definição clara do problema, passa por uma análise de viabilidade e pelo estabelecimento de objetivos SMART. Em seguida, esboça-se a solução (dispositivos, sensores, conexões) e, desde o início, integram-se considerações de segurança. Testes de funcionalidade, usabilidade e segurança validam o projeto antes do lançamento, e a manutenção contínua garante que ele permaneça seguro ao longo do tempo.",
    "questoes": [
      {
        "tipo": "multipla",
        "icone": "gear",
        "leitura": "\"O primeiro passo no planejamento de um projeto de IoT é a definição clara do problema que se deseja resolver.\"",
        "pergunta": "Qual é o primeiro passo no planejamento de um projeto de IoT, segundo o texto?",
        "opcoes": [
          "Comprar os sensores mais caros disponíveis no mercado",
          "A definição clara do problema que se deseja resolver",
          "Contratar uma equipe de marketing",
          "Lançar o produto direto para o público final"
        ],
        "correta": 1,
        "explicacao": "Sem entender claramente o problema (como a gestão de frotas no exemplo da empresa de logística), não é possível direcionar corretamente os esforços de desenvolvimento."
      },
      {
        "tipo": "multipla",
        "icone": "gear",
        "leitura": "\"A análise de viabilidade [...] envolve avaliar se a tecnologia IoT é realmente a melhor solução para o problema identificado, levando em conta os recursos disponíveis e a infraestrutura existente.\"",
        "pergunta": "O que é avaliado durante a análise de viabilidade de um projeto de IoT?",
        "opcoes": [
          "Apenas o preço final do produto para o consumidor",
          "Se a IoT é a melhor solução, considerando recursos, infraestrutura e retorno esperado",
          "A cor da embalagem do dispositivo",
          "O número de concorrentes no mercado de eletrônicos"
        ],
        "correta": 1,
        "explicacao": "A análise de viabilidade evita investir em tecnologias que não se alinham às necessidades reais ou que são inviáveis técnica ou financeiramente."
      },
      {
        "tipo": "multipla",
        "icone": "target",
        "leitura": "\"Estabelecer objetivos claros e mensuráveis é o próximo passo, utilizando a metodologia SMART (Específicos, Mensuráveis, Alcançáveis, Relevantes e Temporais).\"",
        "pergunta": "O que significa a sigla SMART, usada para definir objetivos em projetos de IoT?",
        "opcoes": [
          "Sistemas, Máquinas, Automação, Redes e Tecnologia",
          "Específicos, Mensuráveis, Alcançáveis, Relevantes e Temporais",
          "Sensores, Motores, Atuadores, Roteadores e Transmissores",
          "Segurança, Manutenção, Análise, Rede e Testes"
        ],
        "correta": 1,
        "explicacao": "A metodologia SMART ajuda a criar metas específicas, mensuráveis, alcançáveis, relevantes e com prazo definido, guiando todas as fases do projeto."
      },
      {
        "tipo": "vf",
        "icone": "lock",
        "leitura": "\"As considerações de segurança devem ser integradas desde o início do projeto [...] A segurança deve ser vista como uma parte integrante da solução IoT, não como um adendo ou uma reflexão tardia.\"",
        "pergunta": "De acordo com o texto, a segurança deve ser tratada apenas na etapa final do projeto, depois que tudo já estiver pronto.",
        "correta": false,
        "explicacao": "O texto é enfático: a segurança precisa ser parte integrante da solução desde o início, e não uma reflexão tardia adicionada no final."
      },
      {
        "tipo": "multipla",
        "icone": "gear",
        "leitura": "\"Isso inclui testes de funcionalidade, para verificar se o dispositivo cumpre o que foi projetado para fazer; testes de usabilidade [...] e testes de segurança, para assegurar que o dispositivo é resistente a tentativas de invasão.\"",
        "pergunta": "Qual das opções abaixo NÃO é um tipo de teste mencionado no texto para projetos de IoT?",
        "opcoes": [
          "Teste de funcionalidade",
          "Teste de usabilidade",
          "Teste de segurança",
          "Teste de popularidade nas redes sociais"
        ],
        "correta": 3,
        "explicacao": "O texto cita testes de funcionalidade, usabilidade e segurança como partes essenciais do desenvolvimento — popularidade em redes sociais não é mencionada."
      },
      {
        "tipo": "multipla",
        "icone": "sensor",
        "leitura": "\"A escolha de sensores em um projeto de IoT deve ser guiada não apenas pelos objetivos do projeto, mas também por considerações de segurança e confiabilidade.\"",
        "pergunta": "Além dos objetivos do projeto, o que também deve guiar a escolha dos sensores?",
        "opcoes": [
          "Apenas o menor preço disponível",
          "Considerações de segurança e confiabilidade",
          "A cor do sensor",
          "A marca mais popular nas redes sociais"
        ],
        "correta": 1,
        "explicacao": "Sensores precisos e resistentes a sabotagem ou interferência garantem a integridade e confiabilidade dos dados coletados."
      },
      {
        "tipo": "multipla",
        "icone": "network",
        "leitura": "\"Testes de integração são necessários para garantir que todos os componentes do sistema funcionem harmoniosamente e que não haja falhas de segurança nas interfaces entre diferentes sistemas e dispositivos.\"",
        "pergunta": "Qual é o objetivo dos testes de integração em um projeto de IoT?",
        "opcoes": [
          "Garantir que os componentes funcionem juntos sem falhas de segurança nas interfaces",
          "Verificar apenas o design visual do dispositivo",
          "Reduzir o número de sensores utilizados",
          "Eliminar a necessidade de conectividade"
        ],
        "correta": 0,
        "explicacao": "A interoperabilidade entre diferentes dispositivos e sistemas exige testes cuidadosos para evitar lacunas de segurança nas interfaces entre eles."
      },
      {
        "tipo": "vf",
        "icone": "gear",
        "leitura": "\"A manutenção contínua e o monitoramento de sistemas de IoT são essenciais para garantir que eles permaneçam seguros e funcionais ao longo do tempo.\"",
        "pergunta": "Depois que um sistema IoT é lançado, ele não precisa mais de manutenção ou monitoramento contínuo.",
        "correta": false,
        "explicacao": "Pelo contrário: a manutenção contínua, incluindo patches de segurança e auditorias regulares, é essencial para manter o sistema seguro ao longo do tempo."
      }
    ]
  },
  "aula4": {
    "id": "aula4",
    "numero": 4,
    "titulo": "Segurança, Privacidade e Regulamentações na IoT",
    "leitura_inicial": "Quanto mais dispositivos conectados, maior a superfície de ataque para invasores. Além de medidas técnicas (criptografia, atualizações, normas como ISO/IEC 30141 e NIST), regulamentações como o GDPR (Europa) e a CCPA (Califórnia) protegem a privacidade dos dados dos usuários, exigindo transparência e consentimento informado. A conscientização dos usuários é peça-chave para fortalecer a segurança da IoT.",
    "questoes": [
      {
        "tipo": "multipla",
        "icone": "lock",
        "leitura": "\"Essa conectividade [...] aumenta a superfície de ataque, ou seja, o número de pontos potenciais por onde ataques cibernéticos podem ocorrer.\"",
        "pergunta": "O que significa o termo \"superfície de ataque\" no contexto da IoT?",
        "opcoes": [
          "A área física ocupada pelos dispositivos",
          "O número de pontos potenciais por onde ataques cibernéticos podem ocorrer",
          "A quantidade de energia consumida pelos dispositivos",
          "O tamanho da tela dos dispositivos conectados"
        ],
        "correta": 1,
        "explicacao": "Quanto mais dispositivos conectados existem, mais pontos de entrada (superfície de ataque) ficam disponíveis para possíveis invasores explorarem vulnerabilidades."
      },
      {
        "tipo": "multipla",
        "icone": "globe",
        "leitura": "\"Regulamentações como o Regulamento Geral sobre a Proteção de Dados (GDPR) na Europa [...] desempenham um papel importante.\"",
        "pergunta": "O GDPR (Regulamento Geral sobre a Proteção de Dados) é uma regulamentação de qual região?",
        "opcoes": [
          "Estados Unidos",
          "União Europeia",
          "América do Sul",
          "Ásia"
        ],
        "correta": 1,
        "explicacao": "O GDPR é a regulamentação da União Europeia que estabelece diretrizes para a coleta e o processamento de dados pessoais dos cidadãos europeus."
      },
      {
        "tipo": "multipla",
        "icone": "globe",
        "leitura": "\"A California Consumer Privacy Act (CCPA) na Califórnia desempenham um papel importante [na proteção da privacidade].\"",
        "pergunta": "A CCPA (California Consumer Privacy Act) tem como objetivo proteger a privacidade de quais cidadãos?",
        "opcoes": [
          "Residentes da Califórnia, nos Estados Unidos",
          "Cidadãos de toda a União Europeia",
          "Apenas empresas de tecnologia",
          "Residentes do Canadá"
        ],
        "correta": 0,
        "explicacao": "A CCPA é uma lei estadual da Califórnia voltada a proteger a privacidade e os dados pessoais especificamente dos residentes daquele estado."
      },
      {
        "tipo": "vf",
        "icone": "lock",
        "leitura": "\"Muitos dispositivos IoT são lançados sem a capacidade de serem atualizados [...] Isso pode deixar os usuários expostos a riscos de segurança por longos períodos.\"",
        "pergunta": "Deixar de aplicar atualizações de segurança em dispositivos IoT é uma prática recomendada, pois evita instabilidades.",
        "correta": false,
        "explicacao": "O texto aponta exatamente o contrário: a falta de atualizações regulares é um dos grandes desafios de segurança, pois deixa vulnerabilidades expostas indefinidamente."
      },
      {
        "tipo": "multipla",
        "icone": "gear",
        "leitura": "\"A adoção de normas técnicas, como a ISO/IEC 30141 e diretrizes do NIST, pode ajudar a estabelecer um framework comum que assegure a interoperabilidade e a segurança.\"",
        "pergunta": "Quais normas/diretrizes técnicas são citadas no texto como apoio à segurança e interoperabilidade da IoT?",
        "opcoes": [
          "ISO/IEC 30141 e diretrizes do NIST",
          "HTML5 e CSS3",
          "IEEE 802.11 exclusivamente",
          "Apenas normas internas de cada fabricante"
        ],
        "correta": 0,
        "explicacao": "A norma ISO/IEC 30141 e as diretrizes do NIST (Instituto Nacional de Padrões e Tecnologia dos EUA) ajudam a definir requisitos mínimos de segurança e privacidade para dispositivos IoT."
      },
      {
        "tipo": "multipla",
        "icone": "home",
        "leitura": "\"É essencial que existam políticas de privacidade claras e transparentes, e que o consentimento informado dos usuários seja sempre solicitado.\"",
        "pergunta": "O que é o \"consentimento informado\", mencionado como aspecto fundamental de privacidade?",
        "opcoes": [
          "Um contrato que o usuário assina sem poder lê-lo",
          "A garantia de que o usuário está ciente e concorda com o processamento de seus dados",
          "Uma taxa cobrada para usar dispositivos IoT",
          "Um certificado técnico de fabricação do dispositivo"
        ],
        "correta": 1,
        "explicacao": "O consentimento informado assegura que os usuários estejam cientes de como seus dados serão coletados e usados, e que concordem explicitamente com isso."
      },
      {
        "tipo": "multipla",
        "icone": "lock",
        "leitura": "\"Isso inclui alterar configurações padrão dos dispositivos, usar senhas fortes, segmentar a rede para limitar a exposição de dispositivos vulneráveis e instalar soluções de segurança adequadas, como firewalls.\"",
        "pergunta": "Qual das práticas abaixo é recomendada pelo texto para usuários de dispositivos IoT?",
        "opcoes": [
          "Manter sempre as configurações padrão de fábrica",
          "Usar a mesma senha simples em todos os dispositivos",
          "Alterar configurações padrão, usar senhas fortes e segmentar a rede",
          "Desativar todos os firewalls para melhorar a velocidade"
        ],
        "correta": 2,
        "explicacao": "O texto recomenda alterar configurações padrão (geralmente inseguras), usar senhas fortes, segmentar a rede e instalar soluções como firewalls."
      },
      {
        "tipo": "vf",
        "icone": "lock",
        "leitura": "\"A criptografia ajuda a garantir que, mesmo que os dados sejam interceptados durante a transmissão, eles permaneçam inacessíveis a atores mal-intencionados.\"",
        "pergunta": "A criptografia ajuda a proteger os dados mesmo que sejam interceptados durante a transmissão.",
        "correta": true,
        "explicacao": "Mesmo que um invasor consiga interceptar os dados em trânsito, a criptografia os torna ilegíveis sem a chave correta, protegendo as informações."
      }
    ]
  },
  "aula5": {
    "id": "aula5",
    "numero": 5,
    "titulo": "Origem, Aplicações e Avanços Tecnológicos da IoT",
    "leitura_inicial": "A IoT nasceu em 1982 com uma máquina de venda automática conectada à internet, mas só recebeu esse nome em 1999, cunhado por Kevin Ashton. A adoção do IPv6 em 2008 permitiu conectar bilhões de dispositivos. Hoje a IoT está presente na agricultura, em casas e cidades inteligentes e na saúde, impulsionada por avanços como IA, miniaturização, redes 5G e computação em nuvem — o que também exige atenção redobrada à segurança.",
    "questoes": [
      {
        "tipo": "multipla",
        "icone": "clock",
        "leitura": "\"A Internet das Coisas (IoT) começou a tomar forma em 1982 com a conexão de uma máquina de venda automática da Coca-Cola à internet.\"",
        "pergunta": "Segundo o texto, o marco inicial da IoT, em 1982, foi:",
        "opcoes": [
          "O lançamento do primeiro smartphone",
          "A conexão de uma máquina de venda automática da Coca-Cola à internet",
          "A criação da World Wide Web",
          "A adoção do protocolo IPv6"
        ],
        "correta": 1,
        "explicacao": "O primeiro passo pioneiro da IoT foi a conexão de uma máquina de refrigerantes à internet, permitindo monitorar seu estoque remotamente."
      },
      {
        "tipo": "multipla",
        "icone": "clock",
        "leitura": "\"O termo 'Internet das Coisas' foi cunhado em 1999 por Kevin Ashton, destacando a ideia de que a internet não se limita apenas à interação humana.\"",
        "pergunta": "Quem cunhou o termo \"Internet das Coisas\" e em que ano?",
        "opcoes": [
          "Kevin Ashton, em 1999",
          "Tim Berners-Lee, em 1989",
          "Steve Jobs, em 2007",
          "Bill Gates, em 1995"
        ],
        "correta": 0,
        "explicacao": "Kevin Ashton cunhou o termo em 1999, ressaltando que a internet poderia conectar não apenas pessoas, mas também objetos inanimados."
      },
      {
        "tipo": "multipla",
        "icone": "network",
        "leitura": "\"Com a adoção do IPv6 em 2008, que oferece um número praticamente ilimitado de endereços de IP, a capacidade de conectar bilhões de dispositivos à internet tornou-se uma realidade.\"",
        "pergunta": "Qual foi o impacto da adoção do IPv6 em 2008 para a IoT?",
        "opcoes": [
          "Reduziu o número de dispositivos que podiam se conectar à internet",
          "Permitiu conectar bilhões de dispositivos, graças ao número quase ilimitado de endereços IP",
          "Eliminou a necessidade de conectividade sem fio",
          "Tornou os dispositivos IoT mais baratos automaticamente"
        ],
        "correta": 1,
        "explicacao": "O IPv6 disponibilizou um número praticamente ilimitado de endereços IP, algo essencial já que cada dispositivo conectado precisa de um endereço único."
      },
      {
        "tipo": "multipla",
        "icone": "home",
        "leitura": "\"Sistemas de HVAC (aquecimento, ventilação e ar condicionado) em edifícios comerciais podem aprender padrões de uso e ajustar automaticamente as configurações para maximizar o conforto enquanto minimizam o consumo de energia.\"",
        "pergunta": "No exemplo dos sistemas de HVAC em edifícios comerciais, a integração com IA permite:",
        "opcoes": [
          "Aprender padrões de uso e ajustar automaticamente a temperatura para economizar energia",
          "Eliminar totalmente a necessidade de ar condicionado",
          "Aumentar o consumo de energia para garantir conforto máximo",
          "Substituir os técnicos de manutenção predial"
        ],
        "correta": 0,
        "explicacao": "A IA permite que o sistema aprenda os padrões de uso do edifício e ajuste automaticamente as configurações, equilibrando conforto e economia de energia."
      },
      {
        "tipo": "vf",
        "icone": "chip",
        "leitura": "\"Quanto menor o dispositivo, mais desafiador pode ser incorporar recursos de segurança robustos, o que pode deixar brechas para ataques cibernéticos.\"",
        "pergunta": "A miniaturização dos dispositivos IoT facilita sua incorporação em mais produtos, mas pode dificultar a implementação de segurança robusta.",
        "correta": true,
        "explicacao": "Embora a miniaturização amplie o uso da IoT em vestíveis e componentes agrícolas, dispositivos menores têm mais dificuldade em incorporar recursos de segurança robustos."
      },
      {
        "tipo": "multipla",
        "icone": "network",
        "leitura": "\"Tecnologias como 5G permitem uma conectividade mais rápida e confiável, essencial para aplicações que dependem de resposta em tempo real, como veículos autônomos.\"",
        "pergunta": "Qual benefício o 5G traz para aplicações de IoT que exigem resposta em tempo real, como veículos autônomos?",
        "opcoes": [
          "Conectividade mais rápida e confiável",
          "Redução total da necessidade de sensores",
          "Eliminação da necessidade de segurança de rede",
          "Diminuição da quantidade de dados transmitidos"
        ],
        "correta": 0,
        "explicacao": "O 5G oferece conectividade rápida e confiável, essencial para aplicações críticas em tempo real, como veículos autônomos, mas que também precisa ser protegida contra interceptações."
      },
      {
        "tipo": "multipla",
        "icone": "cloud",
        "leitura": "\"A computação em nuvem tem sido fundamental para o desenvolvimento da IoT, oferecendo uma plataforma para armazenar e processar grandes volumes de dados gerados pelos dispositivos conectados.\"",
        "pergunta": "Por que a computação em nuvem é considerada fundamental para o desenvolvimento da IoT?",
        "opcoes": [
          "Porque substitui totalmente os sensores físicos",
          "Porque oferece uma plataforma para armazenar e processar grandes volumes de dados",
          "Porque impede o acesso remoto aos dispositivos",
          "Porque elimina a necessidade de conectividade à internet"
        ],
        "correta": 1,
        "explicacao": "A nuvem oferece a infraestrutura necessária para armazenar e processar os grandes volumes de dados gerados pelos dispositivos conectados, mas exige segurança robusta para evitar exposição de informações sensíveis."
      },
      {
        "tipo": "vf",
        "icone": "lock",
        "leitura": "\"À medida que mais dispositivos se tornam inteligentes, a quantidade de dados pessoais e corporativos transmitidos aumenta, elevando o risco de violações de segurança.\"",
        "pergunta": "Quanto mais dispositivos IoT conectados existem, menor é a superfície de ataque para ameaças cibernéticas.",
        "correta": false,
        "explicacao": "É o oposto: mais dispositivos conectados significam mais dados transmitidos e, consequentemente, maior risco de violações de segurança."
      }
    ]
  }
};
