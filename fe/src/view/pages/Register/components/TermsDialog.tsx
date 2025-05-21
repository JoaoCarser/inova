"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Checkbox } from "@/components/ui/checkbox";

interface TermsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAgreementChange: (agreed: boolean) => void;
  initialAgreed: boolean;
  isLoading: boolean;
  onSubmit: () => void; // ✅ adicionar esta função
}

export default function TermsDialog({
  open,
  onOpenChange,
  onAgreementChange,
  initialAgreed,
  isLoading,
  onSubmit,
}: TermsDialogProps) {
  const [agreed, setAgreed] = useState(initialAgreed);

  const handleAgreementChange = (checked: boolean) => {
    onAgreementChange(checked);
    setAgreed(checked);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] flex flex-col">
        <DialogHeader>
          <DialogTitle>Termos e Condições</DialogTitle>
        </DialogHeader>

        <ScrollArea className="flex-grow mt-4 mb-4 h-[60vh]">
          <div className="space-y-4 text-sm pr-4">
            <h2 className="text-lg font-semibold">EDITAL INOVA CONTERP 2025</h2>
            <h3 className="font-semibold">OBJETIVO</h3>
            <p>
              O Concurso Inova Conterp 2025 é a terceira edição de uma
              iniciativa do corpo diretivo da Conterp, empresa que atua há mais
              de 20 anos, e que visa reconhecer e impulsionar ideias inovadoras
              dentro de sua organização, para o seu time.
            </p>
            <p>
              O projeto contempla o desenvolvimento de equipamentos, softwares,
              melhorias de processos, entre outros, que nasçam da identificação
              de problemas reais no cotidiano da empresa ou de oportunidades
              ainda não exploradas.
            </p>
            <p>O projeto vencedor será premiado e implementado na Conterp.</p>
            <p>
              Para habilitar a sua participação no edital, além de cumprir com
              as Regras de Participação, descritos logo abaixo neste documento,
              será propor uma ideia.
            </p>
            <p>Como objetivo, pretendemos:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                Desenvolver protótipos de soluções inovadoras que nasçam a
                partir da identificação de um problema ou oportunidade e se
                fundamentam em uma visão integradora de processos de trabalho e
                de experiências reais, considerando seus efeitos dentro da
                corporação e benefícios para o time que a compõe;
              </li>
              <li>
                Estimular os funcionários, residentes no país, com contrato
                ativo na Conterp, a desenvolver soluções para sanar problemas
                identificados na empresa ou criar oportunidades a serem
                exploradas;
              </li>
            </ul>

            <h3 className="font-semibold">PILARES DO PROGRAMA</h3>
            <p>
              <strong>Segurança:</strong> Soluções que diminuam incidentes no
              campo, ampliem a segurança da informação, novos procedimentos de
              prevenção de acidentes e ferramentas.
            </p>
            <p>
              <strong>Meio Ambiente:</strong> Novas formas de reutilização de
              resíduos, redução de desperdícios, processos ambientais
              sustentáveis, soluções ESG, parcerias estratégicas e tecnologias
              inovadoras.
            </p>
            <p>
              <strong>Operações:</strong> Desenvolvimento de patentes, processos
              que otimizem atividades operacionais, reduzam tempo de execução ou
              aumentem produtividade.
            </p>
            <p>
              <strong>Administrativo:</strong> Novos processos administrativos
              visando aumento de produtividade, sistemas operacionais e outras
              soluções para melhoria das rotinas administrativas.
            </p>
            <p>
              O Programa Inova Conterp se apoia em princípios e valores que
              direcionam todo seu desenvolvimento, como:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <strong>Transparência:</strong> compromisso com a integridade
                das ideias e ações apresentadas no desafio ao tornar públicas e
                acessíveis as informações produzidas (reservadas às questões de
                privacidade, acordo com as diretrizes da LGPD, conforme anexo no
                final deste documento, e os critérios de seleção e avaliação
                descritos neste regulamento);
              </li>
              <li>
                <strong>Diversidade:</strong> reconhecimento da pluralidade de
                conhecimentos, assim como, dos gêneros, raças, etnias, condições
                socioeconômicas, territórios, identidades e idades no país;
              </li>
              <li>
                <strong>Equidade:</strong> comprometimento com a redução das
                desigualdades sociais de forma interseccional e estrutural,
                considerando classe, gênero e raça;
              </li>
              <li>
                <strong>Criatividade:</strong> capacidade de criar oportunidades
                disruptivas de aprendizado pessoal e/ou coletivo;
              </li>
              <li>
                <strong>Autonomia:</strong> importância de promover a
                valorização das pessoas, tornando-as protagonistas no seu local
                de trabalho e estimulando a autonomia;
              </li>
              <li>
                <strong>Transformação:</strong> compromisso com criticidade e
                transformação social.
              </li>
            </ul>

            <h3 className="font-semibold">REGRAS DE PARTICIPAÇÃO</h3>
            <p>
              Os cadastros apenas serão aceitos atendendo as seguintes
              condições:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                A participação do(a) candidato(a) está condicionada à sua
                inscrição. Que consiste em realizar o Cadastro no Portal Inova e
                do Envio do Projeto, por meio da plataforma até o dia
                07/07/2025, às 23:59 (para acessar o Portal acesse:
                www.inova.com.br);
              </li>
              <li>
                A participação está restrita exclusivamente a funcionários
                Conterp maiores de 18 anos, residentes no Brasil, com contrato
                ativo. NÃO será permitida participação de terceirizados ou
                consultores externos.
              </li>
              <li>
                O envio das informações sobre o Projeto e o Cadastro do(a)
                Candidato(a) deverão ser realizadas, exclusivamente pelo Portal
                Inova (disponível em: www.inova.com.br);
              </li>
              <li>
                Os projetos podem ser desenvolvidos individualmente ou em grupos
                de ATÉ 03 (três) pessoas, sendo permitido participantes de
                diferentes áreas da empresa.
              </li>
              <li>
                Os projetos deverão apresentar soluções escaláveis para redução
                de custos, aumento de produtividade, otimização de processos ou
                implementação de novas tecnologias aplicáveis aos negócios da
                Conterp.
              </li>
              <li>
                NÃO serão aceitos projetos desenvolvidos por terceiros, mesmo
                que previamente autorizados.
              </li>
              <li>
                Projetos com propostas, soluções e contextos iguais, será
                considerado válido o projeto que for enviado primeiro, por meio
                do Portal Inova Conterp.
              </li>
              <li>
                Será aceito SOMENTE o envio de 01 (um) Projeto por participante
                ou equipe, ou seja, os participantes não poderão estar
                ingressados em mais de um projeto.
              </li>
            </ul>
            <p>
              O único formato de inscrição aceito será via Portal Inova Conterp,
              disponível em: www.inovaconterp.com.br
            </p>

            <h3 className="font-semibold">ETAPAS E CRONOGRAMA</h3>
            <p>
              O Inova Conterp 2025 é composto por 06 (seis) etapas, sendo elas:
            </p>
            <p>
              <strong>ETAPAS 01 E 02: INSCRIÇÃO NO DESAFIO</strong>
            </p>
            <p>
              Contempla a inscrição pelos participantes, através do cadastro
              realizado no Portal Inova Conterp, e o envio dos respectivos
              projetos aderentes aos objetivos do "Inova Conterp 2025" no prazo
              determinado.
            </p>
            <p>
              <strong>ETAPAS 03 E 04: ANÁLISE DOS PROJETOS</strong>
            </p>
            <p>
              Abarca a análise de todos os projetos desenvolvidos e enviados na
              etapa anterior, de inscrição, seguindo os critérios de avaliação,
              expostos neste regulamento. Onde, quando necessário, o Comitê
              poderá enviar questionamentos para os participantes, dentro do
              prazo estipulado.
            </p>
            <p>
              Os participantes terão o prazo, estipulado na tabela, para
              enviarem as devolutivas, relacionadas aos questionamentos do
              Comitê.
            </p>
            <p>
              Todos os participantes que enviarem seus projetos serão
              contemplados com o Certificado de Participação, ainda que não
              sejam selecionados para a próxima fase.
            </p>
            <p>
              Os 03 (três) melhores projetos submetidos avançam para a próxima
              fase.
            </p>
            <p>
              <strong>
                ETAPAS 05 E 06: SELEÇÃO, APRESENTAÇÃO FINAL E PREMIAÇÃO
              </strong>
            </p>
            <p>
              Como objetivo de prototipar e implementar os projetos propostos,
              serão selecionados 03 (três) projetos vencedores para o "Inova
              Conterp 2025".
            </p>
            <p>
              Para os participantes, que ficarem entre os 03 (três) times
              finalistas, caso, não residirem em Salvador-BA, para o dia do
              evento, a Conterp arcará e providenciará as hospedagens,
              deslocamentos e alimentação, para tal, os participantes devem
              entrar em contato com a equipe de suporte para maiores
              informações.
            </p>
            <p>
              Na Cerimônia de Premiação do Inova Conterp 2025, que acontecerá no
              Auditório da sede da Conterp em Salvador-BA, os 03 (três)
              finalistas apresentarão seus projetos desenvolvidos, que serão
              avaliados pelo Comitê e ao final serão divulgadas a ordem dos
              vencedores.
            </p>
            <p>
              <strong>Nota importante:</strong> É imprescindível que o
              participante tenha disponibilidade para viajar à Salvador-BA,
              cidade sede da Conterp, na data estipulada para a realização da
              Cerimônia de Premiação.
            </p>

            <h3 className="font-semibold">CRITÉRIOS DE AVALIAÇÃO</h3>
            <p>Os projetos serão avaliados segundo:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Originalidade e inovação;</li>
              <li>Potencial escalável da solução;</li>
              <li>Viabilidade de implementação;</li>
              <li>
                Benefícios mensuráveis e impacto positivo nos processos
                corporativos e/ou operacionais da Conterp.
              </li>
            </ul>

            <div className="overflow-x-auto mt-4">
              <table className="min-w-full border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border border-gray-300 px-4 py-2">ETAPAS</th>
                    <th className="border border-gray-300 px-4 py-2">
                      DESCRIÇÃO
                    </th>
                    <th className="border border-gray-300 px-4 py-2">DATA</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2">1</td>
                    <td className="border border-gray-300 px-4 py-2">
                      Lançamento do Edital
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      22/05/2025
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2">2</td>
                    <td className="border border-gray-300 px-4 py-2">
                      Encerramento das inscrições e envio dos projetos
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      Até 07/07/2025 às 23h59
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2">3</td>
                    <td className="border border-gray-300 px-4 py-2">
                      Questionamentos do Comitê Avaliador sobre projetos
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      Até 21/07/2025
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2">4</td>
                    <td className="border border-gray-300 px-4 py-2">
                      Respostas às devolutivas pelos participantes
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      Até 18/08/2025 às 23h59
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2">5</td>
                    <td className="border border-gray-300 px-4 py-2">
                      Divulgação dos finalistas
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      Até 29/08/2025
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2">6</td>
                    <td className="border border-gray-300 px-4 py-2">
                      Apresentação final presencial e Cerimônia de Premiação
                      (Salvador-BA)
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      25/09/2025
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3 className="font-semibold">COMUNICAÇÃO DOS RESULTADOS</h3>
            <p>
              Resultados intermediários e finais serão divulgados pelo Portal
              Inova Conterp (www.inovaconterp.com.br), e podem também ser
              divulgados pelas redes sociais corporativas da Conterp (Instagram,
              LinkedIn, Facebook e grupos internos de WhatsApp).
            </p>
            <p>
              É responsabilidade dos participantes acompanhar regularmente as
              comunicações no portal e mídias sociais.
            </p>

            <h3 className="font-semibold">PREMIAÇÃO</h3>
            <p>
              Os projetos escolhidos serão apresentados ao Comitê Avaliativo no
              dia 25/09/2025, durante o evento da Cerimônia de Premiação do
              Inova Conterp 2025. A ordem da classificação final se dará por
              avaliação do Comitê, de acordo com os critérios expostos neste
              documento.
            </p>
            <p>
              Serão distribuídos R$ 09 (nove) mil, em Cartões Alelo Pagamentos,
              para os 03 (três) projetos finalistas, na seguinte proporção:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>1º Lugar: R$ 5.000,00</li>
              <li>2º Lugar: R$ 3.000,00</li>
              <li>3º Lugar: R$ 1.000,00</li>
            </ul>
            <p>
              Os valores serão disponibilizados em cartões Alelo Pagamentos,
              distribuídos igualmente entre os participantes do projeto
              vencedor, se houver mais de um integrante.
            </p>
            <p>
              A Conterp custeará hospedagem, transporte e alimentação para os
              finalistas não residentes em Salvador para participação presencial
              no evento, para tal o participante deverá entrar em contato com a
              equipe de suporte, que lhe fornecerá mais informações.
            </p>

            <h3 className="font-semibold">NOTAS SOBRE O EVENTO</h3>
            <p>
              É mandatório a participação integral em todas as etapas do
              consurso. A não participação em qualquer uma das etapas resultará
              em eliminação automática.
            </p>
            <p>
              Os participantes devem responder a todos os questionamentos do
              Comitê, caso seja realizado, no prazo estipulado para não serem
              desclassificados.
            </p>
            <p>
              Todas as datas estão sujeitas a alterações, que serão informadas
              com antecedência, através do Portal Inova Conterp.
            </p>
            <p>
              O Portal Inova Conterp será a plataforma oficial, onde serão
              disponibilizadas as informações e atualizações do programa. O
              Portal também será o meio para que o participante envie mensagens
              e documentos dos projetos. Portanto, é OBRIGATÓRIO que o(a)
              participante esteja devidamente cadastrado na plataforma.
            </p>

            <h3 className="font-semibold">
              POLÍTICAS DE PRIVACIDADE E PROTEÇÃO DE DADOS
            </h3>
            <p>
              Ao inscrever-se, o participante concorda com o tratamento dos seus
              dados pessoais conforme disposto na LGPD e em termos detalhados no
              Anexo I deste regulamento. Os direitos sobre os projetos
              vencedores serão transferidos à Conterp, que poderá implementá-los
              e/ou patenteá-los.
            </p>

            <h3 className="font-semibold">DISPOSIÇÕES FINAIS</h3>
            <p>
              Ao inscrever-se no programa, o participante concorda
              automaticamente com todos os termos deste regulamento.
            </p>
            <p>
              O participante autoriza uso gratuito de sua imagem, nome e
              informações relacionadas ao projeto para fins institucionais e
              promocionais.
            </p>
            <p>
              Os materiais produzidos durante o evento serão de propriedade
              exclusiva da Conterp.
            </p>

            <h3 className="font-semibold">CONTATO PARA DÚVIDAS</h3>
            <p>
              Dúvidas adicionais podem ser esclarecidas diretamente pelo canal
              oficial:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>E-mail: inova@conterp.com.br</li>
              <li>WhatsApp: (71) 99945-7039 (Equipe de Comunicação).</li>
            </ul>

            <h3 className="font-semibold mt-4">
              ANEXO I – TERMOS DA POLÍTICA DE PROTEÇÃO DE DADOS
            </h3>
            <p>
              Os(As) participantes que forem selecionados(as) no "Inova Conterp"
              autorizam, automaticamente, a utilização de seu nome, e o nome e
              descrição de seu projeto, pela Conterp, com fins puramente de
              divulgação e disseminação do protótipo, sem qualquer ônus para as
              organizações realizadoras e organizadores.
            </p>
            <p>
              Este anexo regula os termos e condições do tratamento dos Dados
              Pessoais dos participantes que se inscreverem no "Inova Conterp"
              previsto neste regulamento. Para fins do presente, entende-se
              como:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                "Dados Pessoais": quaisquer informações relacionadas à pessoa
                natural identificada ou identificável;
              </li>
              <li>
                "Participantes": todas as pessoas ou representantes de entidades
                que se cadastrarem para concorrer ao prêmio do "Inova Conterp".
              </li>
            </ul>

            <h4 className="font-semibold mt-4">
              Controladora dos Dados Pessoais
            </h4>
            <p>
              A Conterp é a controladora dos Dados Pessoais dos Candidatos e
              poderá coletar Dados Pessoais diretamente dos Candidatos, por meio
              de terceiros ou de fontes públicas, conforme necessário para as
              finalidades abaixo descritas.
            </p>

            <h4 className="font-semibold mt-4">Categorias de Dados Pessoais</h4>
            <p>
              A Conterp coleta e trata as seguintes categorias de Dados
              Pessoais:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                Informações de contato: Nome completo, data de nascimento, CPF,
                sexo, endereço de e-mail, cidade e estado e documento de
                identidade (RG);
              </li>
              <li>
                Dados sensíveis: Dados sobre origem racial, étnica ou política;
              </li>
              <li>Vídeo, voz e imagem, Dados de vídeo, voz e imagem.</li>
            </ul>

            <h4 className="font-semibold mt-4">Finalidades</h4>
            <p>
              Os Dados Pessoais serão utilizados para as seguintes finalidades:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                Processos internos: organização e implementação de processos de
                seleção de participantes do Inova Conterp nas etapas descritas
                no presente regulamento;
              </li>
              <li>
                Performance e desenvolvimento: realização de avaliações das
                submissões conforme critérios descritos neste presente
                regulamento;
              </li>
              <li>
                Pagamento do prêmio: realizar o pagamento dos prêmios aos
                vencedores do Inova Conterp, disponível em Cartão Alelo
                Pagamentos;
              </li>
              <li>
                Comunicação proativa: comunicação com o participante, incluindo,
                mas não se limitando via e-mail, mensagem de texto, aplicativo
                de mensagens, ligação telefônica e notificação instantânea
                (push) avisando sobre novidades, eventos e outros assuntos de
                interesse relacionados ao projeto;
              </li>
              <li>
                Comunicação reativa: comunicação com o participante, respondendo
                a eventuais dúvidas;
              </li>
              <li>
                Monitoramento tecnológico: monitoramento de sistemas e recursos
                de tecnologia da Conterp e terceiros contratados pela empresa
                para (i) garantir a segurança dos dados e suas funcionalidades,
                (ii) proteger direitos dos Candidatos, (iii) proteger direitos e
                propriedades de terceiros envolvidos com a premiação e (iv)
                prevenir atividades ilegais, fraudulentas ou suspeitas que
                possam provocar danos à Conterp ou a terceiros, em meios físicos
                e digitais;
              </li>
              <li>
                Produção de conteúdo: produção de conteúdos audiovisuais com
                finalidade informativa, de entretenimento e para divulgação da
                premiação, incluindo os vencedores e demais participantes, para
                disponibilização ao público interno e externo, antes, durante e
                depois da premiação;
              </li>
              <li>
                Cumprimento de obrigações: realização das atividades necessárias
                para dar cumprimento às obrigações legais e/ou regulatórias e às
                eventuais solicitações de órgãos públicos aplicáveis à Conterp,
                inclusive em investigações da área de compliance.
              </li>
            </ul>

            <h4 className="font-semibold mt-4">
              Compartilhamento dos Dados Pessoais
            </h4>
            <p>
              A Conterp poderá compartilhar os Dados Pessoais com os seguintes
              terceiros:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                Empresas Relacionadas: podemos compartilhar os Dados Pessoais
                com Empresas Relacionadas para realizar uma ou mais finalidades
                descritas na seção anterior. Por "Empresas Relacionadas"
                entendem-se todas as empresas que são ou venham ser controladas,
                controladoras, coligadas ou estar sob controle comum da Conterp;
              </li>
              <li>
                Consultores e auditores externos: podemos compartilhar os Dados
                Pessoais com consultores e auditores externos (por ex:,
                advogados, para defesa de direitos e representação em processos
                judiciais e empresas de auditoria para chancela do processo de
                premiação);
              </li>
              <li>
                Entidades de segurança e prevenção a fraudes: Para (i) prevenir
                atividades ilegais, fraudulentas ou suspeitas; (ii) prevenir
                problemas técnicos ou de segurança; e (iii) denunciar violações
                e/ou proteger direitos e propriedades;
              </li>
              <li>
                Autoridades competentes: podemos compartilhar os Dados Pessoais
                com quaisquer autoridades, entes e órgãos estatais, a fim de
                responder e dar cumprimento à ofícios, requerimentos, decisões,
                ordens judiciais ou contribuir com investigações, podendo ainda
                tomar qualquer outra medida que se faça necessária para a defesa
                da Conterp em procedimentos judiciais e administrativos ou para
                dar cumprimento ao quanto exigido em legislação.
              </li>
            </ul>

            <h4 className="font-semibold mt-4">
              Direitos dos titulares de Dados Pessoais
            </h4>
            <p>
              Enquanto titulares de Dados Pessoais, os Participantes podem
              exercer os direitos estipulados sob a Lei Geral de Proteção de
              Dados, a saber:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Confirmação da existência de tratamento;</li>
              <li>Acesso aos dados;</li>
              <li>
                Correção de dados incompletos, inexatos ou desatualizados;
              </li>
              <li>
                Solicitação de anonimização, bloqueio ou eliminação de dados
                desnecessários, excessivos ou tratados em desconformidade com o
                disposto na LGPD;
              </li>
              <li>
                Obtenção de informação das entidades públicas e privadas com as
                quais a Conterp realizou uso compartilhado de dados;
              </li>
              <li>
                Nos casos específicos em que a base legal do tratamento for o
                seu consentimento, solicitação de eliminação dos dados pessoais,
                informação sobre a possibilidade de não fornecer consentimento e
                sobre as consequências da negativa e revogação do consentimento.
              </li>
            </ul>
            <p>
              Você poderá exercer estes direitos enviando um e-mail para:
              inova@conterp.com.br;
            </p>
            <p>
              Alteração destes termos: a Conterp poderá alterar estes termos,
              mediante publicação da versão atualizada deste Anexo 1 em
              www.inovaconterp.com.br.
            </p>
          </div>
        </ScrollArea>

        <div className="flex items-center space-x-2 mt-2 mb-4">
          <Checkbox
            id="terms-dialog"
            checked={agreed}
            onCheckedChange={(checked) =>
              handleAgreementChange(checked === true)
            }
          />
          <label
            htmlFor="terms-dialog"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Li e concordo com os termos do Regulamento.
          </label>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={!agreed || isLoading}
            isLoading={isLoading}
            onClick={() => {
              onSubmit(); // ✅ dispara o submit do form
              onOpenChange(false); // ✅ fecha o dialog
            }}
          >
            Confirm
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
