export default class Formatter {
  public static normalizeText(text: string): string {
    return text.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
  }
}
