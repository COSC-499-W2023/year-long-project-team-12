FROM maven:3.9.5-amazoncorretto-17 as builder
WORKDIR /build/api/app

COPY widget/pom.xml widget/pom.xml
COPY business/pom.xml business/pom.xml
COPY transaction/pom.xml transaction/pom.xml
COPY pom.xml pom.xml

RUN mvn -q -ntp -B -pl transaction -am dependency:go-offline
COPY transaction transaction
RUN mvn -q -ntp -B -pl business -am dependency:go-offline
COPY business business
RUN mvn -q -ntp -B -pl widget -am dependency:go-offline
COPY widget widget
RUN mvn -q -ntp -B -pl transaction,business,widget package

RUN mkdir -p /jar-layers
WORKDIR /jar-layers
RUN java -Djarmode=layertools -jar /build/api/app/widget/target/*.jar extract

FROM amazoncorretto:17.0.7-alpine
RUN mkdir -p /app
WORKDIR /app
COPY --from=builder /jar-layers/dependencies/ ./
COPY --from=builder /jar-layers/spring-boot-loader/ ./
COPY --from=builder /jar-layers/snapshot-dependencies/ ./
COPY --from=builder /jar-layers/application/ ./

ENTRYPOINT ["java", "org.springframework.boot.loader.JarLauncher"]