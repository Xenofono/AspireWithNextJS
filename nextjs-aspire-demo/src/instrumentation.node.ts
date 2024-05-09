import { NodeSDK } from '@opentelemetry/sdk-node'
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-grpc' // Using grpc based on the variable
import { Resource } from '@opentelemetry/resources'
import { SEMRESATTRS_SERVICE_NAME, SemanticResourceAttributes } from '@opentelemetry/semantic-conventions'
import { SimpleSpanProcessor } from '@opentelemetry/sdk-trace-node'
import { AlwaysOnSampler } from '@opentelemetry/sdk-trace-base' // Importing AlwaysOnSampler

// Reading environment variables
const {
  OTEL_EXPORTER_OTLP_ENDPOINT,
  OTEL_EXPORTER_OTLP_HEADERS,
  OTEL_SERVICE_NAME,
  OTEL_TRACES_SAMPLER,
} = process.env

const sdk = new NodeSDK({
  resource: new Resource({
    [SEMRESATTRS_SERVICE_NAME]: OTEL_SERVICE_NAME || 'next-app',
  }),
  spanProcessor: new SimpleSpanProcessor(new OTLPTraceExporter({
    url: OTEL_EXPORTER_OTLP_ENDPOINT,
    headers: OTEL_EXPORTER_OTLP_HEADERS ? JSON.parse(
      `{"${OTEL_EXPORTER_OTLP_HEADERS.replace(/=/g, '":"').replace(/,/g, '","')}"}`
    ) : {}
  })),
  sampler: OTEL_TRACES_SAMPLER === 'always_on' ? new AlwaysOnSampler() : undefined,
})

sdk.start()
