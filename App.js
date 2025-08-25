import React, { useState } from "react";
import { Text, View, StyleSheet, Pressable, Button, Image, TouchableOpacity} from 'react-native';
import { FontAwesome } from "@expo/vector-icons";

export default function App() {
  const [escolhaJogador, setEscolhaJogador] = useState(null);
  const [escolhaComputador, setEscolhaComputador] = useState(null);
  const [resultado, setResultado] = useState("");
  const [placaJogador, setPlacaJogador] = useState(0);
  const [placaComputador, setPlacaComputador] = useState(0);

  const opcoes = [
    { nome: "Pedra", icone: "hand-rock-o" },
    { nome: "Papel", icone: "hand-paper-o" },
    { nome: "Tesoura", icone: "hand-scissors-o" },
  ];

  function jogar(escolha) {
    const escolhaComp = opcoes[Math.floor(Math.random() * 3)];
    setEscolhaJogador(escolha);
    setEscolhaComputador(escolhaComp);
    verificarResultado(escolha.nome, escolhaComp.nome);
  }

  function zerarPlaca(){
    setPlacaJogador(0);
    setPlacaComputador(0);
    setEscolhaJogador(null);
    setEscolhaComputador(null);
    setResultado("");
  }

  function verificarResultado(jogador, computador) {
    if (jogador === computador) {
      setResultado("Empate!");
    } else if (
      (jogador === "Pedra" && computador === "Tesoura") ||
      (jogador === "Papel" && computador === "Pedra") ||
      (jogador === "Tesoura" && computador === "Papel")
    ) {
      setResultado("Você venceu!!!");
      setPlacaJogador(placaJogador + 1);
    } else {
      setResultado("Computador venceu!!");
      setPlacaComputador(placaComputador + 1);
    }
  }

  const teste = () => {
    alert("Teste!");
  };

  const alerta = () => {
    alert("Alerta!");
  };
  return (
    <View style={styles.container}>
      {/* <Text style={styles.titulo}>Jo ken Pô</Text> */}
      <Image
              style={styles.titulo_img}
              source={require('./assets/jokenpo-title.png')}
            />


      <View style={styles.botoes_placa}>
        {/* Box do Jogador */}
        <View style={styles.resultadoBox}>
          <Text style={styles.texto}>VOCÊ: {placaJogador}</Text>
          {escolhaJogador ? (
            <>
              <FontAwesome
                name={escolhaJogador.icone}
                size={60}
                color="#1e90ff"
              />
              <Text style={styles.nomeOpcao}>{escolhaJogador.nome}</Text>
            </>
          ) : (
            <Image
              style={{ width: 90, height: 90 }}
              source={require('./assets/bloco_mario_esquerdo.png')}
            />
          )}
        </View>

        <Image
          style={{ width: 70, height: 100 }}
          source={require('./assets/vs_icone_png.png')}
        />

        {/* Box do Computador */}
        <View style={styles.resultadoBox}>
          <Text style={styles.texto}>COMP: {placaComputador}</Text>
          {escolhaComputador ? (
            <>
              <FontAwesome
                name={escolhaComputador.icone}
                size={60}
                color="#ff4500"
                />
              <Text style={styles.nomeOpcao}>{escolhaComputador.nome}</Text>
            </>
          ) : (
            <Image
            style={{ width: 90, height: 90 }}
            source={require('./assets/bloco_mario_direito.png')}
            />
          )}
        </View>
      </View>
      
      <TouchableOpacity style={styles.botao_nova} onPress={zerarPlaca}>
        <Text style={styles.texto}>Nova Partida</Text>
      </TouchableOpacity>

      {/* Resultado final */}
      {resultado.includes("Você venceu!!!") ? (
        <Text style={styles.resultado_jg}>{resultado}</Text>
      ) : (
        <Text style={styles.resultado}>{resultado}</Text>
      )}


      {/* Botões das opções */}
      <View style={styles.botoes}>
        {opcoes.map((opcao) => (
          <Pressable
            key={opcao.nome}
            style={styles.botao}
            onPress={() => jogar(opcao)}>
            <FontAwesome name={opcao.icone} size={60} color="#333" />
          </Pressable>
        ))}
      </View>

    </View>
  )}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: "center",
    padding: 20,
    backgroundColor: '#f0f0f0',
  },
  titulo_img: {
    width: 170,
    height: 120,
    marginTop: 50, 
  },
  botoes: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginTop: "auto",
    marginBottom: "15%",
  },

  botoes_placa: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    width: "100%",
    marginTop: "20%",
    // backgroundColor: "blue",
    // borderColor: "yellow",
    // borderStyle: "solid",
    // borderWidth: 2,
  },

  botao: {
    alignItems: "center",
    marginHorizontal: 10,
  },
  nomeOpcao: {
    marginTop: 5,
    fontSize: 16,
    fontWeight: "600",
  },
  texto: {
    fontSize: 18,
    marginVertical: 5,
    textAlign: "center",
  },
  resultado: {
    fontSize: 22,
    fontWeight: "bold",
    marginTop: "auto",
    color: "red",
  },
  resultado_jg: {
    fontSize: 22,
    fontWeight: "bold",
    marginTop: "auto",
    color: "yellow",
  },
  resultadoBox: {
    alignItems: "center",
    marginVertical: 35,
  },
  botao_nova: {
    width: "60%",
    textAlign: "center",
    backgroundColor: "#C6CCCC",
    borderWidth: 2,
    borderColor: "#385B58",
  }
});
