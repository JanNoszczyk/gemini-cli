# Gemini Server Documentation

This directory contains comprehensive documentation for the Gemini Server implementation, a REST+WebSocket wrapper around the `@google/gemini-cli-core` package designed for multi-user environments with comprehensive monitoring capabilities.

## Documentation Structure

### Core Documentation
- [**API Reference**](./api-reference.md) - Complete REST API documentation
- [**WebSocket Events**](./websocket-events.md) - WebSocket event specifications
- [**Authentication Guide**](./authentication.md) - Authentication and authorization
- [**Session Management**](./session-management.md) - User session handling
- [**Monitoring Integration**](./monitoring.md) - Activity tracking and monitoring

### Integration Guides
- [**Upstream Integration**](./upstream-integration.md) - Integrating with external services
- [**Client Examples**](./client-examples.md) - Example client implementations
- [**Deployment Guide**](./deployment.md) - Production deployment instructions
- [**Configuration Reference**](./configuration.md) - Environment variables and settings

### Development
- [**Architecture Overview**](./architecture.md) - System design and components
- [**Development Setup**](./development.md) - Setting up development environment
- [**Testing Guide**](./testing.md) - Running tests and test development
- [**Troubleshooting**](./troubleshooting.md) - Common issues and solutions

## Quick Start

1. **Basic Setup**: See [Development Setup](./development.md)
2. **API Usage**: See [API Reference](./api-reference.md)
3. **Monitoring Integration**: See [Monitoring Integration](./monitoring.md)
4. **Production Deployment**: See [Deployment Guide](./deployment.md)

## Key Features

- **Multi-User Support**: Isolated sessions and workspaces per user
- **Real-Time Communication**: WebSocket and Server-Sent Events
- **Comprehensive Monitoring**: Track all engineer activity in real-time
- **Production Ready**: Docker support, rate limiting, error handling
- **Extensible**: Plugin architecture for custom tools and integrations

## Support

For questions or issues:
- Check the [Troubleshooting Guide](./troubleshooting.md)
- Review [Client Examples](./client-examples.md)
- See [Configuration Reference](./configuration.md)