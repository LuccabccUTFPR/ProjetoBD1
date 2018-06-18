DROP DATABASE IF EXISTS Mpas ;
CREATE DATABASE IF NOT EXISTS Mpas;

USE Mpas;

CREATE TABLE USUARIOS(
	login VARCHAR(200),
    nome_usuario VARCHAR(200) NOT NULL,
    senha VARCHAR(30) NOT NULL,
    
    PRIMARY KEY (login)
);

CREATE TABLE EMAILS( 
	end_email VARCHAR (100),
    PRIMARY KEY (end_email)
);

CREATE TABLE USUARIO_EMAIL(
	login VARCHAR(200),
	end_email VARCHAR (100),
    FOREIGN KEY (login) REFERENCES USUARIOS(login),
    FOREIGN KEY (end_email) REFERENCES EMAILS(end_email),
    PRIMARY KEY (login, end_email)
);

CREATE TABLE TELEFONES( 
	ddd VARCHAR(2),
	fone VARCHAR(9),
	usuario VARCHAR(200), 
	FOREIGN KEY (usuario) REFERENCES USUARIOS(login),
	PRIMARY KEY (fone, ddd)
);

CREATE TABLE PROJETO(
	id_projeto INT AUTO_INCREMENT,
    titulo VARCHAR(100),
    descricao VARCHAR(1000),
    gerente VARCHAR(200) NOT NULL,
    subprojeto INT,
    PRIMARY KEY(id_projeto),
	FOREIGN KEY(subprojeto) REFERENCES PROJETO(id_projeto),
    FOREIGN KEY(gerente) REFERENCES USUARIOS(login)
    
);

CREATE TABLE PROJETO_USUARIOS(
	id_projeto INT,
    id_subprojeto INT,
    login VARCHAR(200),
    FOREIGN KEY(id_subprojeto) REFERENCES PROJETO(id_projeto),
    FOREIGN KEY(login) REFERENCES USUARIOS(login),
    PRIMARY KEY(login, id_projeto)
);

CREATE TABLE ATIVIDADES(
	id_atividade INT AUTO_INCREMENT,
    titulo VARCHAR(200),
    descricao VARCHAR(1000),
    data_criacao DATETIME,
    data_inicio DATETIME,
    data_fim DATETIME,
    id_projeto INT NOT NULL,
    criador VARCHAR(200)NOT NULL,
    FOREIGN KEY(id_projeto) REFERENCES PROJETO(id_projeto),
	FOREIGN KEY(criador) REFERENCES USUARIOS(login),
    PRIMARY KEY(id_atividade)
);

CREATE TABLE ATIVIDADES_USUARIOS(/* usuários que participam de determinadas atividades */
	id_atividade INT,
    participante VARCHAR(200),
    FOREIGN KEY(id_atividade) REFERENCES ATIVIDADES(id_atividade),
    FOREIGN KEY(participante) REFERENCES USUARIOS(login),
    PRIMARY KEY(id_atividade, participante)
);

CREATE TABLE COMENTARIOS(
	id_comentario INT AUTO_INCREMENT,
    comentario VARCHAR(1000),
	id_atividade INT NOT NULL,
    usuario VARCHAR(200) NOT NULL,
    FOREIGN KEY(id_atividade) REFERENCES ATIVIDADES(id_atividade),
    FOREIGN KEY(usuario) REFERENCES USUARIOS(login),
    PRIMARY KEY(id_comentario)
);

CREATE TABLE ETIQUETAS(
	id_etiqueta INT AUTO_INCREMENT,
    cor VARCHAR(30),
	nome VARCHAR(200),
    id_atividade INT NOT NULL,
    login VARCHAR(200) NOT NULL,
    FOREIGN KEY(id_atividade) REFERENCES ATIVIDADES(id_atividade),
    FOREIGN KEY(login) REFERENCES USUARIOS(login),
    PRIMARY KEY(id_etiqueta)
);