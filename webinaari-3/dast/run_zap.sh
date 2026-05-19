docker run \
  -v $(pwd)/reports:/zap/reports \
  -v $(pwd):/zap/wrk:ro \
  zaproxy/zap-stable:2.17.0 \
  zap.sh -cmd -autorun /zap/wrk/zap.yaml
  